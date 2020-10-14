import React, { useCallback, useRef, useContext, useEffect, useState } from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext,
} from '@packages/core/ConfigProvider';
import PropTypes from 'prop-types';
import Popper from '@packages/core/Popper';
import useForkRef from '@packages/hooks/useForkRef';
import useControlled from '@packages/hooks/useControlled';
import useId from '@packages/hooks/useId';
import useWillUnmount from '@packages/hooks/useWillUnmount';
import capitalize from '@packages/utils/capitalize'; 
import Paper from '@packages/core/Paper';
import useInit from '@packages/hooks/useInit';
import ClickAwayListener from '@packages/core/ClickAwayListener';
import { Grow } from '@packages/core/Transition';
import "./index.scss";

function flipPlacement(placement){
    let subplacement=placement.substring(0,6);
    let PLACEMENT=['top','bottom','right','left'];
    let index=PLACEMENT.findIndex(item=>subplacement.indexOf(item)>-1);
    if(index>-1){
        return PLACEMENT[index]
    }
    return "top";
}
 
const defaultColor="rgba(48, 48, 48, 0.9)";

const Tooltip = React.forwardRef(function (props, ref) {

    const {
        prefixCls: customizePrefixCls, 
        children,
        title,
        arrow,
        placement = "top", 
        className,
        transition = true,
        visible: visibleProp,
        defaultVisible,
        trigger = "hover",
        enterDelay = 0,
        leaveDelay=0,
        TransitionComponent=Grow,
        id: idProp,
        destroyTooltipOnHide=false,
        onVisibleChange,
        getPopupContainer,
        color,
        shadow,
        externalNode
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Tooltip", customizePrefixCls);
   
    const id = useId(idProp);

    const init=useInit();

    //保持悬浮继续挂载的定时器
    const keepMountedTimer=useRef(null);

    const [arrowRef, setArrowRef] = React.useState(null);

    const enterTimer = React.useRef();
    const leaveTimer = React.useRef();

    useWillUnmount(() => {
        clearTimeout(enterTimer.current);
        clearTimeout(leaveTimer.current);
        clearTimeout(keepMountedTimer.current);
    });

    const [visible, setVisible] = useControlled({
        controlled: visibleProp,
        default: defaultVisible
    });

    const [childNode, setChildNode] = useState();

    const handleRef = useForkRef(children.ref, setChildNode, ref);

    const childrenProps = {
        ref: handleRef,
        id: id, 
    }

    const handleOpen = (event) => { 
        setVisible(true);
    }

    const handleClose=(event)=>{
        setVisible(false); 
    }

    const handleEnter = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
            childrenProps.onMouseOver(event);
        }

        if (event.type === 'focus' && childrenProps.onFocus && forward) {
            childrenProps.onFocus(event);
        }

        clearTimeout(enterTimer.current);

        if (enterDelay) {
            enterTimer.current = setTimeout(
                () => {
                    handleOpen(event);
                },
                enterDelay
            )
        } else {
            handleOpen(event);
        }

    }

    const handleLeave = (forward = true) => (event) => {  

        if(!keepMountedTimer.current && trigger==="hover"){
            return ;
        }

        const childrenProps = children.props;

        if (
            event.type === 'mouseleave' &&
            childrenProps.onMouseLeave &&
            event.currentTarget === childNode
        ) {
            childrenProps.onMouseLeave(event);
        }

        if (
            event.type === 'blur' &&
            childrenProps.onBlur &&
            event.currentTarget === childNode
        ) {
            childrenProps.onBlur(event);
        }
         
        clearTimeout(leaveTimer.current);

        leaveTimer.current=setTimeout(()=>{
            handleClose(event);

            clearTimeout(keepMountedTimer);
        },leaveDelay);
    }

    if (trigger === "hover") {
        childrenProps.onMouseEnter = handleEnter();
        childrenProps.onMouseLeave = (event)=>{
            //如果你想异步访问事件属性，你需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
            event.persist();
            keepMountedTimer.current=setTimeout(()=>{ 
                handleLeave()(event);
            },100) 
        }; 
    } 

    if(trigger === "focus"){
        childrenProps.onFocus=handleEnter();
        childrenProps.onBlur=handleLeave();
     
    }

    const handleClick=(event)=>{   
        if(visible){
            handleLeave()(event);
        }else{
            handleEnter()(event);
        }
    }

    useEffect(()=>{
        if(visible && trigger==="focus"){ 
            childNode && childNode.focus();
        }
    },[visible,childNode,trigger])

    if(trigger === "click"){
        childrenProps.onClick=handleClick;
    }
 
    const handleClickAway=(event)=>{ 
        if(visible && trigger==="click"){
            handleLeave()(event);
        }
    }

    const mergedPopperProps=React.useMemo(() => {
        return { 
              modifiers: [
                {
                  name: 'arrow',
                  options: {
                    element: arrowRef,
                  },
                },
              ],
          } 
    }, [arrowRef]);

    useEffect(()=>{
        if(init){ 
            onVisibleChange?.(visible);
        }
    },[visible])

    const handleTooltipMouseOver=()=>{ 
        if(keepMountedTimer.current){
            clearTimeout(keepMountedTimer.current)
        }
    }

    const handleTooltipMouseLeave=(event)=>{
        if(trigger==="hover"){
            handleLeave()(event)
        }
    } 
  
    return (
        <React.Fragment>
            {React.cloneElement(children, childrenProps)}
            <Popper
                transition={transition}
                placement={placement}
                visible={childNode ? title?visible:false: false}
                id={id}
                mountNode={childNode} 
                keepMounted={!destroyTooltipOnHide}
                target={getPopupContainer}
                {...mergedPopperProps}
            >
                {({placement:placementInner,TransitionProps})=>(
                    <ClickAwayListener onClickAway={handleClickAway} externalNode={trigger==="click"?externalNode:null}>  
                    <TransitionComponent
                        {...TransitionProps}
                    >
                        
                        <Paper
                            className={
                                classNames(
                                    prefixCls,
                                    className,
                                    {
                                        [`${prefixCls}-Placement-${capitalize(flipPlacement(placementInner),false)}`]:placementInner
                                    }
                                )
                            }   
                            shadow={shadow}
                            style={{backgroundColor:color}} 
                            onMouseEnter={handleTooltipMouseOver}
                            onMouseLeave={handleTooltipMouseLeave} 
                        >
                            {title}
                            {arrow?<span className={classNames(
                                `${prefixCls}-Arrow`
                            )}  ref={setArrowRef} style={{color:color||defaultColor}} />:null}
                        </Paper>
                        
                    </TransitionComponent>
                    </ClickAwayListener>
                )}
            </Popper>
        </React.Fragment>
    )
})

Tooltip.propTypes = {
    //是否禁用传送门
    disablePortal: PropTypes.bool,
    //指定容器
    target: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(React.Component)
    ]),
    //孩子节点
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    //自定义类名前缀
    prefixCls: PropTypes.string,
    //添加类名
    className: PropTypes.string,
    //弹框是否显示
    visible: PropTypes.bool,
    //弹框完全消失的回调
    onExited: PropTypes.func,
    //tooltip隐藏时是否销毁tooltip
    destroyTooltipOnHide:PropTypes.bool,
    //显示隐藏的回调
    onVisibleChange:PropTypes.func,
    //浮层渲染父节点
    getPopupContainer:PropTypes.func
};

export default Tooltip;