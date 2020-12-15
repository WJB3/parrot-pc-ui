import React, { useState } from 'react';
import Loading from '@packages/core/Loading'; 

export default function App() {

  const [visible, setVisible] = useState(false);
 

  return (
    <div>
        <Loading   />
    </div>
  );
}

