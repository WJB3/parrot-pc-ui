import React, { useState, useEffect,useLayoutEffect } from 'react';

 

const App  = () => {

  const [a,setA]=useState(0);
  const [b,setB]=useState(0);
  const [c,setC]=useState(0);

  console.log("render");

  useEffect(()=>{
    setA(a+1);
  },[]);

  useEffect(()=>{
    setB(b+1);
  },[a]);

  useEffect(()=>{
    setC(c+1);
  },[b]);
 
  return (
    <div className='App'>
      
    </div>
  );
};

export default App;
