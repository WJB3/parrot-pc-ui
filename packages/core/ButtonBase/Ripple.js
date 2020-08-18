
import React from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';

const Ripple=(props)=>{

    const {
        prefixCls:customizePrefixCls,
        pulsate = false,
        rippleSize,
        rippleX,
        rippleY,
        onExited,
        in:inProp,
        timeout
    }=props;

    const prefixCls=`${customizePrefixCls}-Ripple`

    const [leaving, setLeaving] = React.useState(false);

    const rippleClassName=classNames(
        prefixCls,
        `${prefixCls}-Visible`,
        {
            [`${prefixCls}-Pulsate`]:pulsate
        }
    )

    const childClassName=classNames(
        `${prefixCls}-Child`,
        {
            [`${prefixCls}-ChildLeaving`]:leaving,
            [`${prefixCls}-ChildPulsate`]:pulsate
        }
    )

    const rippleStyles = {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX,
    };

    const handleExited=React.useCallback(onExited);

    React.useEffect(()=>{
        if (!inProp) {

            setLeaving(true);

            const timeoutId = setTimeout(handleExited, timeout);
            return () => {
                clearTimeout(timeoutId);
            };
        }
        return undefined;
    },[handleExited,inProp,timeout])

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
    onExited:PropTypes.func,
    //in表示组件停止或进入
    in:PropTypes.bool,
    //timeout组件离开时exited回调的间隔
    timeout:PropTypes.number.isRequired,
    //波纹的水平位置
    rippleX: PropTypes.number,
    //波纹的垂直位置
    rippleY:PropTypes.number,
    //波纹直径
    rippleSize:PropTypes.number,
}

export default Ripple;