/**
 * Feature:
 *  - fixed not need to set width
 *  - support `rowExpandable` to config row expand logic
 *  - add `summary` to support `() => ReactNode`
 *
 * Update:
 *  - `dataIndex` is `array[]` now
 *  - `expandable` wrap all the expand related props
 *
 * Removed:
 *  - expandIconAsCell
 *  - useFixedHeader
 *  - rowRef
 *  - columns[number].onCellClick
 *  - onRowClick
 *  - onRowDoubleClick
 *  - onRowMouseEnter
 *  - onRowMouseLeave
 *  - getBodyWrapper
 *  - bodyStyle
 *
 * Deprecated:
 *  - All expanded props, move into expandable
 */

import * as React from 'react';
import isVisible from 'rc-util/lib/Dom/isVisible';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import warning from 'rc-util/lib/warning';
import ResizeObserver from 'rc-resize-observer';
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import ColumnGroup from './sugar/ColumnGroup';
import Column from './sugar/Column';
import FixedHeader from './Header/FixedHeader';
import Header from './Header/Header';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import Body from './Body';
import useColumns from './hooks/useColumns';
import { useLayoutState, useTimeoutLock } from './hooks/useFrame';
import { getPathValue, mergeObject, validateValue, getColumnsKey } from './utils/valueUtil';
import ResizeContext from './context/ResizeContext';
import useStickyOffsets from './hooks/useStickyOffsets';
import ColGroup from './ColGroup';
import { getExpandableProps, getDataAndAriaProps } from './utils/legacyUtil';
import Panel from './Panel';
import Footer, { FooterComponents } from './Footer';
import { findAllChildrenKeys, renderExpandIcon } from './utils/expandUtil';
import { getCellFixedInfo } from './utils/fixUtil';
import StickyScrollBar from './stickyScrollBar';
import useSticky from './hooks/useSticky';

// Used for conditions cache
const EMPTY_DATA = [];

// Used for customize scroll
const EMPTY_SCROLL_TARGET = {};

export const INTERNAL_HOOKS = 'rc-table-internal-hook';
 

const MemoTableContent = React.memo(
  ({ children }) => children,

  (prev, next) => {
    if (!shallowEqual(prev.props, next.props)) {
      return false;
    }

    // No additional render when pinged status change.
    // This is not a bug.
    return prev.pingLeft !== next.pingLeft || prev.pingRight !== next.pingRight;
  },
);  
function Table(props) {
  const {
    prefixCls,
    className,
    rowClassName,
    style,
    data,
    rowKey,
    scroll,
    tableLayout,
    direction,

    // Additional Part
    title,
    footer,
    summary,

    // Customize
    id,
    showHeader,
    components,
    emptyText,
    onRow,
    onHeaderRow,

    // Internal
    internalHooks,
    internalRefs,

    sticky,
  } = props;

  const mergedData = data || EMPTY_DATA;
  const hasData = !!mergedData.length;

  // ===================== Effects ======================
  const [scrollbarSize, setScrollbarSize] = React.useState(0);

  React.useEffect(() => {
    setScrollbarSize(getScrollBarSize());
  });
 
  // ==================== Customize =====================
  const mergedComponents = React.useMemo(
    () => mergeObject(components, {}),
    [components],
  );

  const getComponent = React.useCallback(
    (path, defaultComponent) =>
      getPathValue(mergedComponents, path) ||
      defaultComponent,
    [mergedComponents],
  );

  const getRowKey = React.useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record) => {
      const key = record && record[rowKey];

      
      return key;
    };
  }, [rowKey]);

  // ====================== Expand ======================
  const expandableConfig = getExpandableProps(props);

  const {
    expandIcon,
    expandedRowKeys,
    defaultExpandedRowKeys,
    defaultExpandAllRows,
    expandedRowRender,
    onExpand,
    onExpandedRowsChange,
    expandRowByClick,
    rowExpandable,
    expandIconColumnIndex,
    expandedRowClassName,
    childrenColumnName,
    indentSize,
  } = expandableConfig;

  const mergedExpandIcon = expandIcon || renderExpandIcon;
  const mergedChildrenColumnName = childrenColumnName || 'children';
  const expandableType = React.useMemo(() => {
    if (expandedRowRender) {
      return 'row';
    }
    /* eslint-disable no-underscore-dangle */
    /**
     * Fix https://github.com/ant-design/ant-design/issues/21154
     * This is a workaround to not to break current behavior.
     * We can remove follow code after final release.
     *
     * To other developer:
     *  Do not use `__PARENT_RENDER_ICON__` in prod since we will remove this when refactor
     */
    if (
      (props.expandable &&
        internalHooks === INTERNAL_HOOKS &&
        (props.expandable).__PARENT_RENDER_ICON__) ||
      mergedData.some(
        record => record && typeof record === 'object' && record[mergedChildrenColumnName],
      )
    ) {
      return 'nest';
    }
    /* eslint-enable */
    return false;
  }, [!!expandedRowRender, mergedData]);

  const [innerExpandedKeys, setInnerExpandedKeys] = React.useState(() => {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }
    if (defaultExpandAllRows) {
      return findAllChildrenKeys(mergedData, getRowKey, mergedChildrenColumnName);
    }
    return [];
  });
  const mergedExpandedKeys = React.useMemo(
    () => new Set(expandedRowKeys || innerExpandedKeys || []),
    [expandedRowKeys, innerExpandedKeys],
  );

  const onTriggerExpand = React.useCallback(
    (record) => {
      const key = getRowKey(record, mergedData.indexOf(record));

      let newExpandedKeys;
      const hasKey = mergedExpandedKeys.has(key);
      if (hasKey) {
        mergedExpandedKeys.delete(key);
        newExpandedKeys = [...mergedExpandedKeys];
      } else {
        newExpandedKeys = [...mergedExpandedKeys, key];
      }

      setInnerExpandedKeys(newExpandedKeys);
      if (onExpand) {
        onExpand(!hasKey, record);
      }
      if (onExpandedRowsChange) {
        onExpandedRowsChange(newExpandedKeys);
      }
    },
    [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange],
  );

  // ====================== Column ======================
  const [componentWidth, setComponentWidth] = React.useState(0);

  const [columns, flattenColumns] = useColumns(
    {
      ...props,  
      getRowKey, 
      direction,
    },null,
  );

  const columnContext = React.useMemo(
    () => ({
      columns,
      flattenColumns,
    }),
    [columns, flattenColumns],
  );

  // ====================== Scroll ======================
  const fullTableRef = React.useRef();
  const scrollHeaderRef = React.useRef();
  const scrollBodyRef = React.useRef();
  const [pingedLeft, setPingedLeft] = React.useState(false);
  const [pingedRight, setPingedRight] = React.useState(false);
  const [colsWidths, updateColsWidths] = useLayoutState(new Map());

  // Convert map to number width
  const colsKeys = getColumnsKey(flattenColumns);
  const pureColWidths = colsKeys.map(columnKey => colsWidths.get(columnKey));
  const colWidths = React.useMemo(() => pureColWidths, [pureColWidths.join('_')]);
  const stickyOffsets = useStickyOffsets(colWidths, flattenColumns.length, direction);
  const fixHeader = scroll && validateValue(scroll.y);
  const horizonScroll = scroll && validateValue(scroll.x);
  const fixColumn = horizonScroll && flattenColumns.some(({ fixed }) => fixed);

  // Sticky
  const stickyRef = React.useRef();
  const { isSticky, offsetHeader, offsetScroll, stickyClassName, container } = useSticky(
    sticky,
    prefixCls,
  );

  let scrollXStyle;
  let scrollYStyle;
  let scrollTableStyle;

  if (fixHeader) {
    scrollYStyle = {
      overflowY: 'scroll',
      maxHeight: scroll.y,
    };
  }

  if (horizonScroll) {
    scrollXStyle = { overflowX: 'auto' };
    // When no vertical scrollbar, should hide it
    // https://github.com/ant-design/ant-design/pull/20705
    // https://github.com/ant-design/ant-design/issues/21879
    if (!fixHeader) {
      scrollYStyle = { overflowY: 'hidden' };
    }
    scrollTableStyle = {
      width: scroll.x === true ? 'auto' : scroll.x,
      minWidth: '100%',
    };
  }

  const onColumnResize = React.useCallback((columnKey, width) => {
    if (isVisible(fullTableRef.current)) {
      updateColsWidths(widths => {
        if (widths.get(columnKey) !== width) {
          const newWidths = new Map(widths);
          newWidths.set(columnKey, width);
          return newWidths;
        }
        return widths;
      });
    }
  }, []);

  const [setScrollTarget, getScrollTarget] = useTimeoutLock(null);

  function forceScroll(scrollLeft, target) {
    if (!target) {
      return;
    }
    if (typeof target === 'function') {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      // eslint-disable-next-line no-param-reassign
      target.scrollLeft = scrollLeft;
    }
  }

  const onScroll = ({
    currentTarget,
    scrollLeft,
  }) => {
    const mergedScrollLeft = typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;

    const compareTarget = currentTarget || EMPTY_SCROLL_TARGET;
    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      setScrollTarget(compareTarget);

      forceScroll(mergedScrollLeft, scrollHeaderRef.current);
      forceScroll(mergedScrollLeft, scrollBodyRef.current);
      forceScroll(mergedScrollLeft, stickyRef.current?.setScrollLeft);
    }

    if (currentTarget) {
      const { scrollWidth, clientWidth } = currentTarget;
      setPingedLeft(mergedScrollLeft > 0);
      setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
    }
  };

  const triggerOnScroll = () => {
    if (scrollBodyRef.current) {
      onScroll({ currentTarget: scrollBodyRef.current });
    }
  };

  const onFullTableResize = ({ width }) => {
    triggerOnScroll();
    setComponentWidth(fullTableRef.current ? fullTableRef.current.offsetWidth : width);
  };

  // Sync scroll bar when init or `horizonScroll` changed
  React.useEffect(() => triggerOnScroll, []);
  React.useEffect(() => {
    if (horizonScroll) {
      triggerOnScroll();
    }
  }, [horizonScroll]);

  // ================== INTERNAL HOOKS ==================
  React.useEffect(() => {
    if (internalHooks === INTERNAL_HOOKS && internalRefs) {
      internalRefs.body.current = scrollBodyRef.current;
    }
  });

  // ====================== Render ======================
  const TableComponent = getComponent(['table'], 'table');

  // Table layout
  const mergedTableLayout = React.useMemo(() => {
    if (tableLayout) {
      return tableLayout;
    }
    // https://github.com/ant-design/ant-design/issues/25227
    // When scroll.x is max-content, no need to fix table layout
    // it's width should stretch out to fit content
    if (fixColumn) {
      return scroll.x === 'max-content' ? 'auto' : 'fixed';
    }
    if (fixHeader || flattenColumns.some(({ ellipsis }) => ellipsis)) {
      return 'fixed';
    }
    return 'auto';
  }, [fixHeader, fixColumn, flattenColumns, tableLayout]);

  let groupTableNode ;

  // Header props
  const headerProps = {
    colWidths,
    columCount: flattenColumns.length,
    stickyOffsets,
    onHeaderRow,
    fixHeader,
  };

  // Empty
  const emptyNode  = React.useMemo(() => {
    if (hasData) {
      return null;
    }

    if (typeof emptyText === 'function') {
      return emptyText();
    }
    return emptyText;
  }, [hasData, emptyText]);

  // Body
  const bodyTable = (
    <Body
      data={mergedData}
      measureColumnWidth={fixHeader || horizonScroll || isSticky}
      expandedKeys={mergedExpandedKeys}
      rowExpandable={rowExpandable}
      getRowKey={getRowKey}
      onRow={onRow}
      emptyNode={emptyNode}
      childrenColumnName={mergedChildrenColumnName}
    />
  );

  const bodyColGroup = (
    <ColGroup colWidths={flattenColumns.map(({ width }) => width)} columns={flattenColumns} />
  );

  const footerTable = summary && <Footer>{summary(mergedData)}</Footer>;
  const customizeScrollBody = getComponent(['body']);
 

  if (fixHeader || isSticky) {
    let bodyContent;

    if (typeof customizeScrollBody === 'function') {
      bodyContent = customizeScrollBody(mergedData, {
        scrollbarSize,
        ref: scrollBodyRef,
        onScroll,
      });
      headerProps.colWidths = flattenColumns.map(({ width }, index) => {
        const colWidth = index === columns.length - 1 ? (width) - scrollbarSize : width;
        if (typeof colWidth === 'number' && !Number.isNaN(colWidth)) {
          return colWidth;
        }
        warning(
          false,
          'When use `components.body` with render props. Each column should have a fixed value.',
        );

        return 0;
      }) ;
    } else {
      bodyContent = (
        <div
          style={{
            ...scrollXStyle,
            ...scrollYStyle,
          }}
          onScroll={onScroll}
          ref={scrollBodyRef}
          className={classNames(`${prefixCls}-body`)}
        >
          <TableComponent
            style={{
              ...scrollTableStyle,
              tableLayout: mergedTableLayout,
            }}
          >
            {bodyColGroup}
            {bodyTable}
            {footerTable}
          </TableComponent>
        </div>
      );
    }

    groupTableNode = (
      <>
        {/* Header Table */}
        {showHeader !== false && (
          <FixedHeader
            noData={!mergedData.length}
            {...headerProps}
            {...columnContext}
            direction={direction}
            // Fixed Props
            offsetHeader={offsetHeader}
            stickyClassName={stickyClassName}
            ref={scrollHeaderRef}
            onScroll={onScroll}
          />
        )}

        {/* Body Table */}
        {bodyContent}

        {isSticky && (
          <StickyScrollBar
            ref={stickyRef}
            offsetScroll={offsetScroll}
            scrollBodyRef={scrollBodyRef}
            onScroll={onScroll}
            container={container}
          />
        )}
      </>
    );
  } else {
    groupTableNode = (
      <div
        style={{
          ...scrollXStyle,
          ...scrollYStyle,
        }}
        className={classNames(`${prefixCls}-content`)}
        onScroll={onScroll}
        ref={scrollBodyRef}
      >
        <TableComponent style={{ ...scrollTableStyle, tableLayout: mergedTableLayout }}>
          {bodyColGroup}
          {showHeader !== false && <Header {...headerProps} {...columnContext} />}
          {bodyTable}
          {footerTable}
        </TableComponent>
      </div>
    );
  }

  const ariaProps = getDataAndAriaProps(props);

  let fullTable = (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-ping-left`]: pingedLeft,
        [`${prefixCls}-ping-right`]: pingedRight,
        [`${prefixCls}-layout-fixed`]: tableLayout === 'fixed',
        [`${prefixCls}-fixed-header`]: fixHeader,
        /** No used but for compatible */
        [`${prefixCls}-fixed-column`]: fixColumn,
        [`${prefixCls}-scroll-horizontal`]: horizonScroll,
        [`${prefixCls}-has-fix-left`]: flattenColumns[0] && flattenColumns[0].fixed,
        [`${prefixCls}-has-fix-right`]:
          flattenColumns[flattenColumns.length - 1] &&
          flattenColumns[flattenColumns.length - 1].fixed === 'right',
      })}
      style={style}
      id={id}
      ref={fullTableRef}
      {...ariaProps}
    >
      <MemoTableContent
        pingLeft={pingedLeft}
        pingRight={pingedRight}
        props={{ ...props, stickyOffsets, mergedExpandedKeys }}
      >
        {title && <Panel className={`${prefixCls}-title`}>{title(mergedData)}</Panel>}
        <div className={`${prefixCls}-container`}>{groupTableNode}</div>
        {footer && <Panel className={`${prefixCls}-footer`}>{footer(mergedData)}</Panel>}
      </MemoTableContent>
    </div>
  );

  if (horizonScroll) {
    fullTable = <ResizeObserver onResize={onFullTableResize}>{fullTable}</ResizeObserver>;
  }

  const TableContextValue = React.useMemo(
    () => ({
      prefixCls,
      getComponent,
      scrollbarSize,
      direction,
      fixedInfoList: flattenColumns.map((_, colIndex) =>
        getCellFixedInfo(colIndex, colIndex, flattenColumns, stickyOffsets, direction),
      ),
      isSticky,
    }),
    [
      prefixCls,
      getComponent,
      scrollbarSize,
      direction,
      flattenColumns,
      stickyOffsets,
      direction,
      isSticky,
    ],
  );

  const BodyContextValue = React.useMemo(
    () => ({
      ...columnContext,
      tableLayout: mergedTableLayout,
      rowClassName,
      expandedRowClassName,
      componentWidth,
      fixHeader,
      fixColumn,
      horizonScroll,
      expandIcon: mergedExpandIcon,
      expandableType,
      expandRowByClick,
      expandedRowRender,
      onTriggerExpand,
      expandIconColumnIndex,
      indentSize,
    }),
    [
      columnContext,
      mergedTableLayout,
      rowClassName,
      expandedRowClassName,
      componentWidth,
      fixHeader,
      fixColumn,
      horizonScroll,
      mergedExpandIcon,
      expandableType,
      expandRowByClick,
      expandedRowRender,
      onTriggerExpand,
      expandIconColumnIndex,
      indentSize,
    ],
  );

  const ResizeContextValue = React.useMemo(() => ({ onColumnResize }), [onColumnResize]);

  return (
    <TableContext.Provider value={TableContextValue}>
      <BodyContext.Provider value={BodyContextValue}>
        <ResizeContext.Provider value={ResizeContextValue}>{fullTable}</ResizeContext.Provider>
      </BodyContext.Provider>
    </TableContext.Provider>
  );
}

Table.Column = Column;

Table.ColumnGroup = ColumnGroup;

Table.Summary = FooterComponents;

Table.defaultProps = {
  rowKey: 'key',
  prefixCls: 'rc-table',
  emptyText: () => 'No Data',
};

export default Table;