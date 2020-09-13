import React from 'react';
import PropTypes from 'prop-types'; 
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';
import { reflow } from './utils'
import "./index.scss";
function getScale(value) {
    return `scale(${value}, ${value ** 2})`;
}

const styles = {
    entering: {
        opacity: 1,
        transform: getScale(1),
    },
    entered: {
        opacity: 1,
        transform: 'none',
    },
};

const Grow = React.forwardRef(function (props, ref) {
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

    const handleEnter = function(node, isAppearing){ 

        reflow(node);
       
 
        node.style.webkitTransition = `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        node.style.transition =`opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1)`;

        onEnter?.(node,isAppearing);

    };

    const handleExit = function(node, isAppearing){ 
 
        node.style.webkitTransition = `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${timeout && timeout.leave?timeout.leave:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;`;
        node.style.transition =  `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${timeout && timeout.leave?timeout.leave:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;`;

        node.style.opacity = '0';
        node.style.transform = getScale(0.75);

        onExit?.(node,isAppearing);

    };

    return (
        <TransitionComponent
            appear
            in={visibleProp}
            onEnter={handleEnter} 
            onExit={handleExit} 
            timeout={timeout}
            {...other}
        >
            {
                (state, childProps) => {
                    return React.cloneElement(children, {
                        style: {
                            opacity: 0,
                            transform: getScale(0.75),
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

Grow.propTypes = {
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

export default Grow;