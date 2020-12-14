import React, { useState, useCallback,useMemo } from 'react'; 
import TransitionR from '@packages/core/ReactTransitionGroup/Transition'; 

export default function App() {
    
  return (
    <div> 
      <TransitionR>
        {(status,childProps)=>{ 
          return <div>{"bbb"}</div>
        }}
      </TransitionR> 
    </div>
  );
}

