import React, { useState } from "react";
import useControlled from '@packages/hooks/useControlled'; 

const Demo2=React.memo((props)=>{
  console.log("Demo2");
  console.log(props.controlled)
  return <div>aaa</div>
})

const Demo=()=>{
  console.log("Demo");
  let [count,setCount]=useState(0);
  let [arr,setArr]=useState([1]); 

  const [value,setValue,controlled]=useControlled({
    controlled:arr,
    default:undefined
  }); 

  let a=10;

  return (
    <div> 
      {count}
      <Demo2 controlled={controlled} setValue={setValue}/>
      <button onClick={()=>{setCount(count+1);}}>{"测试"}</button>
    </div>
  )
};

export default Demo;