import React,{cloneElement} from 'react';
import classNames  from '@packages/utils/classNames';
import { 
    ConfigContext
} from '@packages/core/ConfigProvider'; 
import capitalize from '@packages/utils/capitalize'
import { CSSTransition } from 'react-transition-group';
import "./index.scss";

const SliderDisplay = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        in: inProps,
        onEnter,
        onExited,
        onExit,
        status,
        //leftRight
        direction="upDown",
        ...restProps
    } = props;

    const prefixCls = React.useContext(ConfigContext)?.getPrefixCls("DatePicker-Slider-Translation", customizePrefixCls); 

    const handleEnter = (node, isAppearing) => { 
 
        if (onEnter) {
          onEnter(node, isAppearing);
        }
    };

    const handleExit=(node,isAppearing)=>{
        if(onExit){
            onExit(node, isAppearing);
        }
    }

    const handleExited=(node,isAppearing)=>{
 
        if(onExited){
            onExited(node, isAppearing);
        }
    }


    return (
       
        <CSSTransition
            in={inProps}
            timeout={450}
            appear
            classNames={classNames(
                prefixCls,
                { 
                    [`${prefixCls}-${capitalize(direction,false)}`]:direction,
                    [`${prefixCls}-${capitalize(status,false)}`]:status,
                }
            )}
            onEnter={handleEnter}
            onExit={handleExit}
            onExited={handleExited}
            {...restProps}
        >
            {
            (state, childProps) => {
                return cloneElement(children, {
                    style: {
                        visibility: state === 'exited' && !inProps ? "hidden" : undefined,
                        ...children.props.style,
                    },
                    ref:ref,
                    ...childProps
                })
            }
        }
        </CSSTransition>
    

    )
});

export default SliderDisplay;