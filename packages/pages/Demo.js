import React, { useState, useCallback } from 'react';
import { Transition } from 'react-transition-group';
import TransitionR from '@packages/core/ReactTransitionGroup/Transition';

class Demo extends React.Component{
  constructor(props){
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log("getDerivedStateFromProps")
    console.log(prevState)
    console.log(nextProps)
    return null;
  }
  componentDidUpdate(preProps,preState){
    console.log("componentDidUpdate")
    console.log(preProps)
    console.log(preState)
  }

  render(){
    return <div>{this.props.a}</div>
  }
  
}

export default function App() {
  const [visible, setVisible] = useState(false);
  const [count2, setCount2] = useState(0);

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
 
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };



  return (
    <div>
      <Transition in={visible}  >
        {state => { 
          console.log(state)
          return (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            I'm a fade Transition!
          </div>
        )}}
      </Transition>
      <TransitionR in={visible}  >
        {state => { 
          console.log(state)
          return (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            I'm a fade Transition!
          </div>
        )}}
      </TransitionR>
      <Demo a={count2}/>

      <button onClick={()=>setVisible(!visible)}>aaaaaa</button>
      <button onClick={()=>setCount2(count2+1)}>aaaaaa</button>
    </div>
  );
}

