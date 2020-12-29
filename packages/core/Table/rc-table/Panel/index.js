import * as React from 'react';
 
function Panel({ className, children }) {
  return <div className={className}>{children}</div>;
}

export default Panel;