import React  from 'react'; 
import PropTypes from 'prop-types'; 
import Transition from '@packages/core/ReactTransitionGroup/Transition';
import { duration } from '@packages/core/styles/transitions'; 
import { reflow } from './utils';

const styles = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
};

const Fade = React.forwardRef(function (props, ref) {
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

        node.style.webkitTransition = `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
        node.style.transition =`opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;

        onEnter?.(node,isAppearing);

    };

    const handleExit = function(node, isAppearing){ 
 
        node.style.webkitTransition = `opacity ${timeout && timeout.exit?timeout.exit:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
        node.style.transition =  `opacity ${timeout && timeout.exit?timeout.exit:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;

        onExit?.(node,isAppearing);

    }; 
 

    return (
        <TransitionComponent
            appear
            visible={visibleProp}
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
                            opacity: 0,
                            visibility: state === 'exited' && !visibleProp ? 'hidden' : undefined,
                            ...style,
                            ...styles[state], 
                            ...children?.props?.style
                        },
                        ref:ref,
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

Fade.propTypes = {
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

export default Fade;