import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import TouchRipple from './TouchRipple';
import {ConfigContext} from '@packages/core/ConfigProvider';
import "./index.scss";

const ButtonBase=React.forwardRef((props,ref)=>{
    const {
        component:Component='button',
        type="default",
        className,
        disabled=false,
        disableRipple = false,
        disableTouchRipple=false,
        tabIndex = 0,
        children,
        prefixCls:customizePrefixCls,
        onClick,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
        centerRipple=false,
        TouchRippleProps,
        ...restProps
    }=props;
 
    const prefixCls=useContext(ConfigContext)?.getPrefixCls("ButtonBase",customizePrefixCls); 

    let ComponentProp=Component;

    const rippleRef = React.useRef(null);

    function useRippleHandler(rippleAction,eventCallback,skipRippleAction=disableTouchRipple){
        return event=>{
            if(eventCallback){
                eventCallback(event)
            }
            const ignore = skipRippleAction;
            if (!ignore && rippleRef.current) {
                rippleRef.current[rippleAction](event);
            }
            return true;
        }
    }

    const handleFocus = event => {
        if (disabled) {
          return;
        }  

        if (onFocus) {
          onFocus(event);
        }
    };

    const handleBlur = useRippleHandler(
        'stop',
        event => {
          if (onBlur) {
            onBlur(event);
          }
        },
        false
    );

    const handleKeyDown = event => {
        if (onKeyDown) {
          onKeyDown(event);
        }
    };

    const handleKeyUp = event => {
        if (onKeyUp) {
          onKeyUp(event);
        }
    };

    const handleMouseDown = useRippleHandler('start', onMouseDown);
    const handleMouseUp = useRippleHandler('stop', onMouseUp);
    const handleMouseLeave = useRippleHandler('stop', onMouseLeave);

    const handleTouchStart = useRippleHandler('start', onTouchStart);
    const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
    const handleTouchMove = useRippleHandler('stop', onTouchMove);
     

    return (
        <ComponentProp
            tabIndex={disabled?-1:tabIndex}
            className={classNames(
                prefixCls,className,
                {
                    [`${prefixCls}-disabled`]:disabled
                }
            )}
            onClick={onClick} 
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
            onBlur={handleBlur}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove} 
            ref={ref}
            {...restProps}
        >
            {children}
            {!disableRipple && !disabled && <TouchRipple  center={centerRipple} prefixCls={prefixCls} ref={rippleRef} {...TouchRippleProps} /> }
        </ComponentProp>
    )

});

ButtonBase.propTypes={
    //ButtonBase的component
    component:PropTypes.any,
    //ButtonBase的type类型
    type:PropTypes.oneOf(['primary','default','danger','submit', 'reset']),
    //ButtonBase是否禁用
    disabled:PropTypes.bool,
    //ButtonBase是否启动表单相关属性
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //ButtonBase的孩子节点
    children:PropTypes.node,
    //是否禁用Ripple
    disableRipple:PropTypes.bool,
    //是否禁用TouchRipple
    disableTouchRipple: PropTypes.bool,
    //点击事件
    onClick:PropTypes.func,
    //鼠标离开事件
    onMouseLeave:PropTypes.func,
    //鼠标按下事件
    onMouseDown:PropTypes.func,
    //鼠标松开事件
    onMouseUp:PropTypes.func,
    //触发焦点事件
    onFocus:PropTypes.func,
    //离开焦点事件
    onBlur:PropTypes.func,
    //按键按下事件
    onKeyDown:PropTypes.func,
    //按键松开事件
    onKeyUp:PropTypes.func,
    //按下手指时
    onTouchStart:PropTypes.func,
    //松开手指时
    onTouchEnd:PropTypes.func,
    //移动手指时
    onTouchMove:PropTypes.func,
    //中心涟漪
    centerRipple:PropTypes.bool,
    //touchripple属性
    TouchRippleProps: PropTypes.object,
}

export default ButtonBase;