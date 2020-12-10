import React, { useState, useCallback,useEffect,useLayoutEffect } from 'react';
import Button from '@packages/core/Button';
import useComponentWillMount from '@packages/hooks/useComponentWillMount';
 
const FuncDemo1=(props)=>{

  const [ a,setA ]=useState(1)

  useLayoutEffect(()=>{
    setA(props.bb)
  },[]);

  console.log("logaFunc") 

  return <div>FuncDemo1</div>
}

class ClassDemo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      a:1
    }
  }

  UNSAFE_componentWillMount(){ 
    this.setState({
      a:this.props.bb
    })
  }

  render(){
    console.log("logaClass") 
    return <div>ClassDemo</div>
  }
}

const App  = () => {
     
 
  return (
    <div className='App' > 
      
      <FuncDemo1 bb={2}></FuncDemo1>
      <ClassDemo bb={2}></ClassDemo> 
    </div>
  );
};

export default App;
