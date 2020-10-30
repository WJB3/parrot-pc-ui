import React, { useCallback } from 'react';

//跟踪是否处于键盘模式
let hadKeyboardEvent=true; 

//如果最近的用户交互是通过键盘，以及按键没有包含meta键、alt/option键或control键，那么模态是键盘。
function handleKeyDown(event){
    if(event.metaKey || event.altKey ||event.ctrlKey){
        return ;
    }
    hadKeyboardEvent=true;
}
//如果用户在任何时候点击指向设备，确保我们改变成远离键盘的模态。 
function handlePointerDown(){
    hadKeyboardEvent=false;
}

 
function isFocusVisible(event) {
    const { target } = event;
    try { 
        console.log(target.matches(':focus-visible'))
      return target.matches(':focus-visible');
    } catch (error) { 
    }
   
    return hadKeyboardEvent;
}
  

function prepare(doc) {
    doc.addEventListener('keydown', handleKeyDown, true);
    doc.addEventListener('mousedown', handlePointerDown, true);
    doc.addEventListener('pointerdown', handlePointerDown, true);
    doc.addEventListener('touchstart', handlePointerDown, true);
}

export function teardown(doc) {
    doc.removeEventListener('keydown', handleKeyDown, true);
    doc.removeEventListener('mousedown', handlePointerDown, true);
    doc.removeEventListener('pointerdown', handlePointerDown, true);
    doc.removeEventListener('touchstart', handlePointerDown, true);
}
  

export default function useIsFocusVisible(){ 

    const ref=useCallback((node)=>{
        if(node!==null){ 
            prepare(node.ownerDocument);
        }
    },[]); 
    
    const isFocusVisibleRef = React.useRef(false);

    function handleBlurVisible() { 
        if (isFocusVisibleRef.current) {
          isFocusVisibleRef.current = false; 
        } 
    }

    function handleFocusVisible(event) {
        if (isFocusVisible(event)) {
          isFocusVisibleRef.current = true; 
        }
    }

    return { isFocusVisibleRef, onFocus: handleFocusVisible, onBlur: handleBlurVisible, ref };
}