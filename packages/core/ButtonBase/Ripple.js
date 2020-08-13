
import React from 'react';
import classNames from '@packages/utils/classNames';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Ripple=(props)=>{

    const {
        prefixCls:customizePrefixCls,
        pulsate = false,
        rippleSize,
        rippleX,
        rippleY,
        onExited,
        in:inProp
    }=props;

    const prefixCls=`${customizePrefixCls}-Ripple`

    const [leaving, setLeaving] = React.useState(false);

    const rippleClassName=classNames(
        prefixCls,
        `${prefixCls}-visible`,
        {
            [`${prefixCls}-pulsate`]:pulsate
        }
    )

    const childClassName=classNames(
        `${prefixCls}-child`,
        {
            [`${prefixCls}-childLeaving`]:leaving,
            [`${prefixCls}-childPulsate`]:pulsate
        }
    )

    const rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX,
    };

    useEffect(()=>{

    },[inProp])

    return (
        <span className={rippleClassName} style={rippleStyles}>
            <span className={childClassName} />
        </span>
    )

}

Ripple.propTypes={
    //前缀
    prefixCls:PropTypes.string,
    //停止的回调
    onExited:PropTypes.func

}