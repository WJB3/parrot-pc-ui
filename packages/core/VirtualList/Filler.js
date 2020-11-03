
import React from 'react';
import ResizeObserver from '@packages/core/ResizeObserver';
import classNames from '@packages/utils/classNames';


const Filler=React.forwardRef((props,ref)=>{

    const {
        height,
        offset,
        prefixCls,
        children,
        onInnerResize
    }=props;

    let outerStyle={}; 

    if(offset!==undefined){
        outerStyle={height,position:"relative",overflow:"hidden",transform:`translateY(${offset}px)`};
    }
    
    return (
        <div style={outerStyle}  >
            <ResizeObserver onResize={({offsetHeight})=>{ 
                if(offsetHeight && onInnerResize){
                    onInnerResize();
                }
            }}> 
                <>
                    {children} 
                </>
            </ResizeObserver>
        </div>
    )
});

export default Filler;