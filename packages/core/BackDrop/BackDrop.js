import React, { useEffect, useContext, useState } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Portal from '@packages/core/Portal';
import Slide from '@material-ui/core/Slide';
import { Fade } from '@packages/core/Transition';
import ClickAwayListener from '@packages/core/ClickAwayListener';
import "./index.scss";

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
        transitionComponent: TransitionComponent = Slide,
        onClickAway = noop,
        //背景色是否透明
        transparent=false,
        ...restProps
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("BackDrop", customizePrefixCls);

    const [stopListen, setStopListen] = useState(true);

    useEffect(() => {
        if (disabledScroll && visible) {
            document.body.style = "overflow:hidden";
        }

        return () => {
            if (visible) {
                document.body.style = "overflow:auto";
            }
        }
    }, [disabledScroll, visible]); 

    return (
        <Portal target={target} ref={ref}>
            <TransitionComponent in={visible} onEntered={() => setStopListen(false)} onExited={() => setStopListen(true)}>

                <div className={classNames(
                    prefixCls, className, {
                    [`${prefixCls}-Centered`]: centered,
                    [`${prefixCls}-NoTransparent`]:!transparent
                }
                )} {...restProps}>
                    <ClickAwayListener onClickAway={onClickAway} stopListen={stopListen} >
                        {children}
                    </ClickAwayListener>
                </div>

            </TransitionComponent>
        </Portal>
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