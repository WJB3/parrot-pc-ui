import React, { useState, useCallback,useEffect,useLayoutEffect } from 'react';
import Button from '@packages/core/Button';
 
const FuncDemo1=()=>{
  console.log("funcdemo1")
  return <div>FuncDemo1</div>
}

class ClassDemo extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    console.log("props")
    return <div>ClassDemo</div>
  }
}

const App  = () => {
    
  const [count,setCount]=useState(1); 
 
  return (
    <div className='App' >
    
      <Button onClick={()=>setCount(count+1)}>
        setStateA
      </Button>
      
      <FuncDemo1></FuncDemo1>
      <ClassDemo></ClassDemo>
    </div>
  );
};

export default App;
