import React from 'react';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls'; 
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';
import "./index.scss";

const styles = {
    entering: {
      transform: 'none',
    },
    entered: {
      transform: 'none',
    },
};

const Zoom = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
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

    const prefixCls = usePrefixCls('Transition-Zoom', customizePrefixCls);

    const handleEnter = function(node, isAppearing){ 
       
 
        node.style.webkitTransition = `transform ${timeout && timeout.enter?timeout.enter:timeout}ms`;
        node.style.transition =`transform ${timeout && timeout.enter?timeout.enter:timeout}ms`;

        onEnter?.(node,isAppearing);

    };

    const handleExit = function(node, isAppearing){ 
 
        node.style.webkitTransition = `transform ${timeout && timeout.exit?timeout.exit:timeout}ms`;
        node.style.transition =  `transform ${timeout && timeout.exit?timeout.exit:timeout}ms`;

        onExit?.(node,isAppearing);

    };

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
                        ref:ref,
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

Zoom.propTypes = {
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

export default Zoom;