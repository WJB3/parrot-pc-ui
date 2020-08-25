import React from 'react';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';
import useForkRef from '@packages/hooks/useForkRef';
import "./index.scss";


export function setTranslateValue(direction, node) {
    const transform = getTranslateValue(direction, node);

    if (transform) {
        node.style.webkitTransform = transform;
        node.style.transform = transform;
    }
}

function getTranslateValue(direction, node) {
    const rect = node.getBoundingClientRect();

    let transform;

    if (node.fakeTransform) {
        transform = node.fakeTransform;
    } else {
        const computedStyle = window.getComputedStyle(node);
        transform =
            computedStyle.getPropertyValue('-webkit-transform') ||
            computedStyle.getPropertyValue('transform');
    }

    let offsetX = 0;
    let offsetY = 0;

    if (transform && transform !== 'none' && typeof transform === 'string') {
        const transformValues = transform
            .split('(')[1]
            .split(')')[0]
            .split(',');
        offsetX = parseInt(transformValues[4], 10);
        offsetY = parseInt(transformValues[5], 10);
    }

    if (direction === 'left') {
        return `translateX(${window.innerWidth}px) translateX(-${rect.left - offsetX}px)`;
    }

    if (direction === 'right') {
        return `translateX(-${rect.left + rect.width - offsetX}px)`;
    }

    if (direction === 'up') {
        return `translateY(${window.innerHeight}px) translateY(-${rect.top - offsetY}px)`;
    }

    // direction === 'down'
    return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

const Slide = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        direction = 'down',
        TransitionComponent = Transition,
        children,
        visible: visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout = {
            enter: duration.enteringScreen,
            exit: duration.leavingScreen
        },
        style,
        ...other
    } = props;

    const prefixCls = usePrefixCls('Transition-Slide', customizePrefixCls);

    const childrenRef = useRef(null);

    const handleEnter = function(node, isAppearing) {

        const node = childrenRef.current;

        setTranslateValue(direction, node);

        onEnter?.(node, isAppearing);

    };

    const handleExit = function (node, isAppearing) {

        node.style.webkitTransition = `transform ${timeout && timeout.exit ? timeout.exit : timeout}ms`;
        node.style.transition = `transform ${timeout && timeout.exit ? timeout.exit : timeout}ms`;

        onExit?.(node, isAppearing);

    };

    const handleRef = useForkRef(childrenRef, children.ref, ref);

    return (
        <TransitionComponent
            appear
            in={visibleProp}
            onEnter={handleEnter}
            onEntered={(node, isAppearing) => onEntered?.(node, isAppearing)}
            onEntering={(node, isAppearing) => onEntering?.(node, isAppearing)}
            onExit={handleExit}
            onExited={(node, isAppearing) => onExited?.(node, isAppearing)}
            onExiting={(node, isAppearing) => onExiting?.(node, isAppearing)}
            timeout={timeout}
            {...other}
        >
            {
                (state, childProps) => {
                    return React.cloneElement(children, {
                        style: {
                            transform: 'scale(0)',
                            visibility: state === 'exited' && !visibleProp ? 'hidden' : undefined,
                            ...style,
                            ...styles[state],
                            ...children.props.style
                        },
                        ref: handleRef,
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

Slide.propTypes = {
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
    style: PropTypes.object
};

export default Slide;