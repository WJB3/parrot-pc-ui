import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useForkRef from '@packages/hooks/useForkRef';

function getContainer(target) {
    //容器
    const containerSelf = typeof target === 'function' ? target() : target;
    return ReactDOM.findDOMNode(containerSelf);
}

const Portal = React.forwardRef((props, ref) => {
    const {
        children,
        disablePortal = false,
        target,
    } = props;

    const [mountNode, setMountNode] = React.useState(null);

    const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);

    React.useEffect(() => {
        if (!disablePortal) {
            setMountNode(getContainer(target) || document.body);
        }
    }, [target, disablePortal]);

    if (disablePortal) {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                ref: handleRef,
                id:"protal"
            });
        }
    } 

    return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});

Portal.propTypes = { 
    //传送门
    children: PropTypes.node,
    //是否禁用传送门
    disablePortal: PropTypes.bool,
    //target
    target: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.any
    ])
}

export default Portal;