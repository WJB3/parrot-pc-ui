import React, { useEffect, useContext, useState, useRef } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Portal from '@packages/core/Portal';
// import Slide from '@material-ui/core/Slide';
import { Fade, Slide } from '@packages/core/Transition';
import ClickAwayListener from '@packages/core/ClickAwayListener';
import Mask from './Mask';
import "./index.scss";
import KeyCode from '@packages/utils/KeyCode';

function noop() { }

const BackDrop = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        visible,
        children,
        target,
        disabledScroll,
        centered = false,
        transitionComponent: TransitionComponent = Fade,
        transitionComponentProp,
        onClickAway = noop,
        //背景色是否透明
        transparent = false,
        keyboard,
        onTransitionExited,
        onTransitionEntered,
        maskStyle,
        zIndex = "auto",
        drawer=false,
        ...restProps
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("BackDrop", customizePrefixCls);

    const [stopListen, setStopListen] = useState(true);

    const modalRef = useRef(null);

    const [appear, setAppear] = useState(false);

    const handleKeyDown = (e) => {
        if (keyboard && e.keyCode === KeyCode.ESC) {
            onClickAway?.(e);
        }
    }

    useEffect(() => {
        if (disabledScroll && visible) {
            document.body.style = "overflow:hidden";
        }
        if (visible && modalRef.current) {
            modalRef.current?.focus();
        }
        if (!visible) {
            modalRef.current?.blur();
        }
        return () => {
            if (visible) {
                document.body.style = "overflow:auto";
            }
        }
    }, [disabledScroll, visible, modalRef.current]);

    let centerStyle = {}

    if (centered) {
        centerStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }
    const divStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...centerStyle
    }

    const handleEntered=(e)=>{ 
        setStopListen(false);
        onTransitionEntered?.(e);
    }

    const handleExited = (e) => { 
        setStopListen(true);
        setAppear(false);
        onTransitionExited?.(e);
    }

    const commonContent = (
        <TransitionComponent visible={visible} onEnter={() => setAppear(true)} onEntered={handleEntered} onExited={handleExited} {...transitionComponentProp}>
            <div
                className={classNames(
                    prefixCls, className, {
                    [`${prefixCls}-Centered`]: centered,
                })}
                {...restProps}
            >

                <ClickAwayListener onClickAway={onClickAway} stopListen={stopListen} ref={modalRef}>
                    {React.cloneElement(children, {
                        tabIndex: -1,
                        onKeyDown: handleKeyDown
                    })}
                </ClickAwayListener>

            </div>
        </TransitionComponent>
    );

    const drawerContent = (
        <div
            className={classNames(
                prefixCls, className, {
                [`${prefixCls}-Centered`]: centered,
            })}
            {...restProps}
        >
            <TransitionComponent visible={visible} onEnter={() => setAppear(true)} onEntered={handleEntered} onExited={handleExited} {...transitionComponentProp}>
                <ClickAwayListener onClickAway={onClickAway} stopListen={stopListen} ref={modalRef}>
                    {React.cloneElement(children, {
                        tabIndex: -1,
                        onKeyDown: handleKeyDown
                    })}
                </ClickAwayListener>
            </TransitionComponent>
        </div>
    )

    return (
        <Portal target={target} ref={ref}>
            <div style={{ ...divStyle, zIndex: appear ? zIndex : -1 }}>
                <Fade visible={visible} unmountOnExit  >
                    <Mask prefixCls={prefixCls} transparent={transparent} maskStyle={maskStyle} />
                </Fade>

                {drawer ?  drawerContent : commonContent}

            </div>
        </Portal >
    )
});

BackDrop.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    disabledScroll: PropTypes.bool,
    visible: PropTypes.bool,
    target: PropTypes.object,
    onClick: PropTypes.func
};

export default BackDrop;