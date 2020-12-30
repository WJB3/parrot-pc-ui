

import React from 'react';
import HeaderRow from './HeaderRow';
import TableContext from '../context/TableContext';

function parseHeaderRows(
    rootColumns,
) {
    const rows = [];

    function fillRowCells(
        columns,
        colIndex,
        rowIndex = 0,
    ) {
        // Init rows
        rows[rowIndex] = rows[rowIndex] || [];

        let currentColIndex = colIndex;
        const colSpans = columns.filter(Boolean).map(column => {
            const cell = {
                key: column.key,
                className: column.className || '',
                children: column.title,
                column,
                colStart: currentColIndex,
            };

            let colSpan = 1;

            const subColumns = (column).children;
            if (subColumns && subColumns.length > 0) {
                colSpan = fillRowCells(subColumns, currentColIndex, rowIndex + 1).reduce(
                    (total, count) => total + count,
                    0,
                );
                cell.hasSubColumns = true;
            }

            if ('colSpan' in column) {
                ({ colSpan } = column);
            }

            if ('rowSpan' in column) {
                cell.rowSpan = column.rowSpan;
            }

            cell.colSpan = colSpan;
            cell.colEnd = cell.colStart + colSpan - 1;
            rows[rowIndex].push(cell);

            currentColIndex += colSpan;

            return colSpan;
        });

        return colSpans;
    }

    // Generate `rows` cell data
    fillRowCells(rootColumns, 0);

    // Handle `rowSpan`
    const rowCount = rows.length;
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        rows[rowIndex].forEach(cell => {
            if (!('rowSpan' in cell) && !cell.hasSubColumns) {
                // eslint-disable-next-line no-param-reassign
                cell.rowSpan = rowCount - rowIndex;
            }
        });
    }

    return rows;
}


const Header = (props) => {

    const {
        columns
    } = props;

    const { prefixCls } = React.useContext(TableContext);
    const rows = React.useMemo(() => parseHeaderRows(columns), [columns]);

    return (
        <thead className={`${prefixCls}-Thead`}>
            {rows.map((row,rowIndex)=>{
                const rowNode=(
                    <HeaderRow 
                        key={rowIndex}
                        cells={row}
                        rowComponent={"tr"}
                        cellComponent={"th"}
                        index={rowIndex}
                    />
                );
                return rowNode;
            })}
        </thead>
    )

}

export default Header;