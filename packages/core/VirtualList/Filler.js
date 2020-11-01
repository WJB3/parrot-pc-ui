
import React, { Children } from 'react';
import ResizeObserver from '@package/cores/ResizeObserver';
import classNames from '@packages/utils/classNames';


const Filler=React.forwardRef((props,ref)=>{

    const {
        height,
        offset,
        prefixCls,
        children
    }=props;

    let outerStyle={};

    let innerStyle={
        display:"flex",
        flexDirection:"column"
    }

    if(offset!==undefined){
        outerStyle={height,position:"relative",overflow:"hidden"};

        innerStyle={
            ...innerStyle,
            transform:`translateY(${offset}px)`,
            position:"absolute",
            left:0,
            right:0,
            top:0
        }
    
    }

    
    return (
        <div style={outerStyle}>
            <ResizeObserver>
                <div 
                    style={innerStyle}
                    className={
                        classNames(
                            {
                                [`${prefixCls}-Inner`]:prefixCls
                            }
                        )
                    }
                    ref={ref}
                >
                    {children}
                </div>
            </ResizeObserver>
        </div>
    )
});

export default Filler;