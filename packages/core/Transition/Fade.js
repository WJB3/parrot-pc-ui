import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import capitalize from '@packages/utils/capitalize';
import { CSSTransition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';
import "./index.scss";



const Fade=React.forwardRef(function(props,ref){
    const {
        prefixCls:customizePrefixCls,
        className,
        TransitionComponent=CSSTransition,
        children,
        visible:visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout={
            enter:duration.enteringScreen,
            exit:duration.leavingScreen
        },
        style,
        ...other
    }=props;

    const prefixCls=usePrefixCls('Transition-Fade',customizePrefixCls);

    return (
        <TransitionComponent
            in={visibleProp}
            classNames={classNames(className,`${prefixCls}`)}
            onEnter={(node,isAppearing)=>onEnter?.(node,isAppearing)}
            onEntered={(node,isAppearing)=>onEntered?.(node,isAppearing)}
            onEntering={(node,isAppearing)=>onEntering?.(node,isAppearing)}
            onExit={(node,isAppearing)=>onExit?.(node,isAppearing)}
            onExited={(node,isAppearing)=>onExited?.(node,isAppearing)}
            onExiting={(node,isAppearing)=>onExiting?.(node,isAppearing)}
            timeout={timeout}
            {...other}
        >
            {
                (state,childProps)=>{
                    return React.cloneElement(children,{
                        style:{
                            visibility:state==='exited'&&!visibleProp ? 'hidden':undefined,
                            ...style,
                            ...children.props.style
                        },
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

Fade.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string,
    TransitionComponent:PropTypes.any,
    children:PropTypes.any,
    visibleProp:PropTypes.bool,
    onEnter:PropTypes.func,
    onEntered:PropTypes.func,
    onEntering:PropTypes.func,
    onExit:PropTypes.func,
    onExited:PropTypes.func,
    onExiting:PropTypes.func,
    timeout:PropTypes.any,
    style:PropTypes.object
};

export default Fade;