import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import RcTable, { Summary } from 'rc-table';
import { TableProps as RcTableProps, INTERNAL_HOOKS } from 'rc-table/lib/Table';
import { convertChildrenToColumns } from 'rc-table/lib/hooks/useColumns';
import Spin, { SpinProps } from '../spin'; 
import { ConfigContext } from '../config-provider/context';
import usePagination, { DEFAULT_PAGE_SIZE, getPaginationParam } from './hooks/usePagination';
import useLazyKVMap from './hooks/useLazyKVMap'; 
import { 
  ColumnsType, 
  TablePaginationConfig, 
} from './interface';
import useSelection, { SELECTION_ALL, SELECTION_INVERT } from './hooks/useSelection';
import useSorter, { getSortData, SortState } from './hooks/useSorter';
import useFilter, { getFilterData, FilterState } from './hooks/useFilter';
import useTitleColumns from './hooks/useTitleColumns';
import renderExpandIcon from './ExpandIcon';
import scrollTo from '../_util/scrollTo';
import defaultLocale from '../locale/en_US';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import devWarning from '../_util/devWarning';
import useBreakpoint from '../grid/hooks/useBreakpoint';

export { ColumnsType, TablePaginationConfig };

const EMPTY_LIST = [];

  

function Table(props) {
  const {
    prefixCls: customizePrefixCls,    
    dataSource,    
    columns, 
    childrenColumnName: legacyChildrenColumnName,
    onChange,
    getPopupContainer,
    loading,
    expandIcon,
    expandable,
    expandedRowRender,
    expandIconColumnIndex,
    indentSize,
    scroll,
    sortDirections,
    locale,
    showSorterTooltip = true,
  } = props; 

  const screens = useBreakpoint();
  const mergedColumns = React.useMemo(() => {
    const matched = new Set(Object.keys(screens).filter((m) => screens[m]));

    return (columns || []).filter(
      (c) =>
        !c.responsive || c.responsive.some((r) => matched.has(r)),
    );
  }, [columns, screens]);

  const tableProps = omit(props, ['columns']);
 
  const { locale: contextLocale = defaultLocale, renderEmpty, direction } = React.useContext(
    ConfigContext,
  ); 
  const tableLocale = { ...contextLocale.Table, ...locale };
  const rawData  = dataSource || EMPTY_LIST;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls); 

  const mergedExpandable  = {
    childrenColumnName: legacyChildrenColumnName,
    expandIconColumnIndex,
    ...expandable,
  };
  const { childrenColumnName = 'children' } = mergedExpandable;

  const expandType = React.useMemo(() => {
    if (rawData.some(item => (item)?.[childrenColumnName])) {
      return 'nest';
    }

    if (expandedRowRender || (expandable && expandable.expandedRowRender)) {
      return 'row';
    }

    return null;
  }, [rawData]);

  const internalRefs = {
    body: React.useRef(),
  };

 

  const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName);

  // ============================ Events =============================
  const changeEventInfo = {};

  const triggerOnChange = (
    info,
    action,
    reset = false,
  ) => {
    const changeInfo = {
      ...changeEventInfo,
      ...info,
    };

    if (reset) {
      changeEventInfo.resetPagination();

      
      
    }

    if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body.current) {
      scrollTo(0, {
        getContainer: () => internalRefs.body.current,
      });
    }

    if (onChange) {
      onChange(changeInfo.pagination, changeInfo.filters, changeInfo.sorter, {
        currentDataSource: getFilterData(
          getSortData(rawData, changeInfo.sorterStates, childrenColumnName),
          changeInfo.filterStates,
        ),
        action,
      });
    }
  };

  /**
   * Controlled state in `columns` is not a good idea that makes too many code (1000+ line?)
   * to read state out and then put it back to title render.
   * Move these code into `hooks` but still too complex.
   * We should provides Table props like `sorter` & `filter` to handle control in next big version.
   */

  // ============================ Sorter =============================
  const onSorterChange = (
    sorter,
    sorterStates ,
  ) => {
    triggerOnChange(
      {
        sorter,
        sorterStates,
      },
      'sort',
      false,
    );
  };
  const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] = useSorter({
    prefixCls,
    mergedColumns,
    onSorterChange,
    sortDirections: sortDirections || ['ascend', 'descend'],
    tableLocale,
    showSorterTooltip,
  });
  const sortedData = React.useMemo(() => getSortData(rawData, sortStates, childrenColumnName), [
    rawData,
    sortStates,
  ]);

  changeEventInfo.sorter = getSorters();
  changeEventInfo.sorterStates = sortStates;

  // ============================ Filter ============================
  const onFilterChange = (
    filters ,
    filterStates ,
  ) => {
    triggerOnChange(
      {
        filters,
        filterStates,
      },
      'filter',
      true,
    );
  };

  const [transformFilterColumns, filterStates, getFilters] = useFilter({
    prefixCls,
    locale: tableLocale,
    prefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer,
  });
  const mergedData = getFilterData(sortedData, filterStates);

  changeEventInfo.filters = getFilters();
  changeEventInfo.filterStates = filterStates;

  // ============================ Column ============================
  const columnTitleProps = React.useMemo(
    () => ({
      ...sorterTitleProps,
    }),
    [sorterTitleProps],
  );
  const [transformTitleColumns] = useTitleColumns(columnTitleProps);

  // ========================== Pagination ==========================
  const onPaginationChange = (current, pageSize) => {
    triggerOnChange(
      {
        pagination: { ...changeEventInfo.pagination, current, pageSize },
      },
      'paginate',
    );
  };

  const [mergedPagination, resetPagination] = usePagination(
    mergedData.length, 
    onPaginationChange,
  );

  changeEventInfo.pagination =
    pagination === false ? {} : getPaginationParam(pagination, mergedPagination);

  changeEventInfo.resetPagination = resetPagination;

  // ============================= Data =============================
  const pageData = React.useMemo(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData;
    }

    const { current = 1, total, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination;

    // Dynamic table data
    if (mergedData.length < total) {
      if (mergedData.length > pageSize) {
        devWarning(
          false,
          'Table',
          '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.',
        );
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }

    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [
    !!pagination,
    mergedData,
    mergedPagination && mergedPagination.current,
    mergedPagination && mergedPagination.pageSize,
    mergedPagination && mergedPagination.total,
  ]);

  
 
  // ========================== Expandable ==========================

  // Pass origin render status into `rc-table`, this can be removed when refactor with `rc-table`
  (mergedExpandable as any).__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon;

  // Customize expandable icon
  mergedExpandable.expandIcon =
    mergedExpandable.expandIcon || expandIcon || renderExpandIcon(tableLocale);

  // Adjust expand icon index, no overwrite expandIconColumnIndex if set.
  if (expandType === 'nest' && mergedExpandable.expandIconColumnIndex === undefined) {
    mergedExpandable.expandIconColumnIndex =  0;
  }  
  if (typeof mergedExpandable.indentSize !== 'number') {
    mergedExpandable.indentSize = typeof indentSize === 'number' ? indentSize : 15;
  }

  // ============================ Render ============================
  const transformColumns = React.useCallback(
    (innerColumns )  => {
      return transformTitleColumns(
        transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns))),
      );
    },
    [transformSorterColumns, transformFilterColumns, transformSelectionColumns],
  );

  let topPaginationNode;
  let bottomPaginationNode;
 

  // >>>>>>>>> Spinning
  let spinProps ;
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading,
    };
  } else if (typeof loading === 'object') {
    spinProps = {
      spinning: true,
      ...loading,
    };
  }

  const wrapperClassNames = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    }
  );
  return (
    <div className={wrapperClassNames}>
      <Spin spinning={false} {...spinProps}>
        {topPaginationNode}
        <RcTable 
          {...tableProps}
          columns={mergedColumns}
          direction={direction}
          expandable={mergedExpandable}
          prefixCls={prefixCls}
          className={classNames({  
            [`${prefixCls}-empty`]: rawData.length === 0,
          })}
          data={pageData}  
          emptyText={(locale && locale.emptyText) || renderEmpty('Table')}
          // Internal
          internalHooks={INTERNAL_HOOKS}
          internalRefs={internalRefs as any}
          transformColumns={transformColumns}
        />
        {bottomPaginationNode}
      </Spin>
    </div>
  );
}

 
Table.SELECTION_ALL = SELECTION_ALL;
Table.SELECTION_INVERT = SELECTION_INVERT;
Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Summary = Summary;

export default Table;