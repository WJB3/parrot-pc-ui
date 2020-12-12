import React from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls'; 
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';

import "./index.scss"; 


const Collapse = React.forwardRef(function(props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        TransitionComponent = Transition,
        component: Component = 'div',
        children,
        visible: visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        collapsedHeight: collapsedHeightProp = '0px',
        timeout = duration.standard,
        style,
        ...other
    } = props;

    const wrapperRef = React.useRef(null);

    const collapsedHeight =
        typeof collapsedHeightProp === 'number' ? `${collapsedHeightProp}px` : collapsedHeightProp;

    const prefixCls = usePrefixCls('Transition-Collapse', customizePrefixCls);

    const handleEnter = (node, isAppearing) => {
        node.style.height = collapsedHeight;

        onEnter?.(node, isAppearing);
    };

    const handleEntering = (node, isAppearing) => {
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;

        node.style.transitionDuration = `${timeout && timeout.enter?timeout.enter:timeout}ms`;

        node.style.height = `${wrapperHeight}px`;

        onEntering?.(node, isAppearing)

    };

    const handleEntered = (node, isAppearing) => {
        node.style.height = 'auto';
        onEntered?.(node, isAppearing)
    };

    const handleExit = node => {
        console.log("handleExit");
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        node.style.height = `${wrapperHeight}px`;
        onExit?.(node)
    };

    const handleExiting = node => {
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
 
        node.style.transitionDuration = `${timeout && timeout.leave?timeout.leave:timeout}ms`;
     
        node.style.height = collapsedHeight;

        onExiting?.(node);

    };

    return (
        <TransitionComponent
            appear
            in={visibleProp}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit} 
            onExiting={handleExiting} 
            timeout={timeout === 'auto' ? null : timeout} 
            {...other}
        >
            {(state, childProps) => {return (
                <Component
                    className={classNames(
                        `${prefixCls}-Container`,
                        {
                            [`${prefixCls}-Entered`]: state === 'entered',
                            [`${prefixCls}-Hidden`]: state === 'exited' && !visibleProp && collapsedHeight === '0px',
                        },
                        className,
                    )}
                    style={{
                        minHeight: collapsedHeight,
                        ...style,
                    }}
                    ref={ref}
                    {...childProps}
                >
                    <div className={`${prefixCls}-Wrapper`} ref={wrapperRef}>
                        <div className={`${prefixCls}-WrapperInner`}>{children}</div>
                    </div>
                </Component>
            )}}
        </TransitionComponent>
    )
});

Collapse.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    TransitionComponent: PropTypes.any,
    children: PropTypes.any,
    visibleProp: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onEntering: PropTypes.func,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    onExiting: PropTypes.func,
    timeout: PropTypes.any,
    style: PropTypes.object,
    collapsedHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    component: PropTypes.string
};

export default Collapse;