import React, { useState, useCallback, useMemo } from 'react';
import TransitionR from '@packages/core/ReactTransitionGroup/Transition';
import Button from '@packages/core/Button';
import { Fade,Collapse } from '@packages/core/Transition';

export default function App() {

  const [visible, setVisible] = useState(false);

  const statusStyle = {
    exited: { opacity: 0 },
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 }
  }

  return (
    <div>
      

      <Collapse visible={visible} timeout={5000}>
        <div
          style={{ background: 'red', width: 200, height: 200 }}
        >{"测试"}</div>
      </Collapse>

      <Button onClick={() => setVisible(!visible)}>显示</Button>

    </div>
  );
}

