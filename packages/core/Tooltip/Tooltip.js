import React,{useCallback,useRef,useContext, useEffect } from 'react';
import classNames from '@packages/utils/classNames'; 
import {
    ConfigContext,
} from '@packages/core/ConfigProvider'; 
import { createPopper } from '@popperjs/core'
import useForkRef from '@packages/hooks/useForkRef';
import Portal from '@packages/core/Portal';
import setRef from '@packages/utils/setRef';
import PropTypes from 'prop-types';
import "./index.scss";


function getTarget(target){
    if(target && target.current){
        return target.current;
    }
    return typeof anchorEl==="function"?anchorEl():anchorEl;
}

const Popper = React.forwardRef(function(props,ref){
 
    const {
        prefixCls:customizePrefixCls,  
        visible,
        children,
        target,
        disablePortal=false,
        placement="right",
        mountNode,//需要挂载的节点
        className,
        transition=true,
    } = props;

    const [exited, setExited] = React.useState(true);//定义动画是否退出
    
    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Popper", customizePrefixCls); 

    const popperRef=useRef(null);//div为popper的节点

    const locationRef=useRef(null);//popjs节点用于存储popperjs

    const ownRef=useForkRef(popperRef,ref);

    const handleOpen=useCallback(()=>{
        if(!popperRef.current || !mountNode ||!visible){
            return ;
        }

        if(locationRef.current){
            locationRef.current.destroy();
        }

        const popper=createPopper(getTarget(mountNode),popperRef.current,{
            placement
        });

        locationRef.current=popper;
 
    },[mountNode, disablePortal, visible, placement]);

    const handleClose = () => {
        if (!locationRef.current) {
          return;
        }
    
        locationRef.current.destroy(); 
    };
  
    const handleRef=React.useCallback(
        (node)=>{
            setRef(ownRef,node);//将div id=popper节点赋值给tooltipRef
            handleOpen();
        },
        [ownRef,handleOpen]
    );

    
    const handleEnter=()=>{
        setExited(false);
    };

    const handleExited=()=>{
        setExited(true); 
        handleClose();
    }

    React.useEffect(() => {
        if (!visible && !transition) {
          // Otherwise handleExited will call this.
          handleClose();
        }
    }, [visible, transition]);

    const childProps = { placement }

    if (transition) {
        childProps.TransitionProps = {
            visible: visible,
            onEnter:handleEnter,
            onExited:handleExited
        };
    }

    useEffect(()=>()=>handleClose(),[]);

    if (!visible && (!transition || exited) ) {
        return null;
    }  
  
    return (
        <Portal target={target}  disablePortal={disablePortal}>
            <div
                ref={handleRef}
                id="popper"
                className={classNames(
                    prefixCls,
                    className
                )}
                style={{
                    willChange:'transform'
                }}
                 
            >
                {typeof children === 'function' ? children(childProps) : children}
            </div>
        </Portal>
    )
})

Popper.propTypes={
    //是否禁用传送门
    disablePortal:PropTypes.bool,
    //指定容器
    target:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(React.Component)
    ]),
    //孩子节点
    children:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls:PropTypes.string,
    //添加类名
    className:PropTypes.string,
    //弹框是否显示
    visible:PropTypes.bool,
    //弹框完全消失的回调
    onExited:PropTypes.func
};

export default Popper;