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

const ARROW_LENGTH=7;

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
        id: idProp
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Tooltip", customizePrefixCls);
   
    const id = useId(idProp);

    const [arrowRef, setArrowRef] = React.useState(null);

    const enterTimer = React.useRef();
    const leaveTimer = React.useRef();

    useWillUnmount(() => {
        clearTimeout(enterTimer.current);
        clearTimeout(leaveTimer.current);
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
        className:classNames(className)
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
        const childrenProps = children.props;

        if (
            event.type === 'mouseleave' &&
            childrenProps.onMouseLeave &&
            event.currentTarget === childNode
        ) {
            childrenProps.onMouseLeave(event);
        }
         
        clearTimeout(leaveTimer.current);

        leaveTimer.current=setTimeout(()=>{
            handleClose(event);
        },leaveDelay);
    }

    if (trigger === "hover") {
        childrenProps.onMouseOver = handleEnter();
        childrenProps.onMouseLeave = handleLeave(); 
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
 

    return (
        <React.Fragment>
            {React.cloneElement(children, childrenProps)}
            <Popper
                transition={transition}
                placement={placement}
                visible={childNode ? visible : false}
                id={id}
                mountNode={childNode} 
                {...mergedPopperProps}
            >
                {({placement:placementInner,TransitionProps})=>(
                    <TransitionComponent
                        {...TransitionProps}
                    >
                        <div
                            className={
                                classNames(
                                    prefixCls,
                                    {
                                        [`${prefixCls}-Placement-${capitalize(flipPlacement(placementInner),false)}`]:placementInner
                                    }
                                )
                            }    
                        >
                            {title}
                            {arrow?<span className={classNames(
                                `${prefixCls}-Arrow`
                            )}  ref={setArrowRef} />:null}
                        </div>
                    </TransitionComponent>
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
    onExited: PropTypes.func
};

export default Tooltip;