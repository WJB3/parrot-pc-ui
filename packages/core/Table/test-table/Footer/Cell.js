import * as React from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext'; 


export default function SummaryCell({
  className,
  index,
  children,
  colSpan,
  rowSpan,
  align,
}) {
  const { prefixCls, fixedInfoList } = React.useContext(TableContext);

  const fixedInfo = fixedInfoList[index];

  return (
    <Cell
      className={className}
      index={index}
      component="td"
      prefixCls={prefixCls}
      record={null}
      dataIndex={null}
      align={align}
      render={() => ({
        children,
        props: {
          colSpan,
          rowSpan,
        },
      })}
      {...fixedInfo}
    />
  );
}