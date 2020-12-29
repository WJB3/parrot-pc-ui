import * as React from 'react';
import ResizeObserver from 'rc-resize-observer';

 

export default function MeasureCell({ columnKey, onColumnResize }) {
  const cellRef = React.useRef();

  React.useEffect(() => {
    if (cellRef.current) {
      onColumnResize(columnKey, cellRef.current.offsetWidth);
    }
  }, []);

  return (
    <ResizeObserver
      onResize={({ offsetWidth }) => {
        onColumnResize(columnKey, offsetWidth);
      }}
    >
      <td ref={cellRef} style={{ padding: 0, border: 0, height: 0 }}>
        <div style={{ height: 0, overflow: 'hidden' }}>&nbsp;</div>
      </td>
    </ResizeObserver>
  );
}