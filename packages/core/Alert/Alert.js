
import React, { useState, useContext } from 'react';
import { ConfigContext } from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';
import {
    WarningOutline,
    ErrorOutline,
    InfoOutline,
    SuccessOutline,
    CloseOutline,
    Warning,
    Error,
    Info,
    Success
} from '@packages/core/Icon';
import Paper from '@packages/core/Paper';
import {
    Collapse
} from '@packages/core/Transition';
import "./index.scss";
function noop(){}
const Alert = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        outline,
        className,
        message,
        color = "default",
        //是否有icon
        hasIcon: hasIconProp = true,
        icon,
        closable = false,
        description,
        //隐藏时是否销毁节点
        destroyOnHidden=false,
        //关闭动画结束后触发的回调函数
        afterClose=noop,
        onClose,
        action,
        style,
        block=true,
        type="notification"
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Alert", customizePrefixCls);

    const [visible, setVisible] = useState(true);

    const hasIcon = ((color === "error" || color === "danger" || color === "warning" || color === "info" || color === "success") && hasIconProp) || icon;

    const IconMap = {
        "error": <ErrorOutline />,
        "danger": <ErrorOutline />,
        "warning": <WarningOutline />,
        "info": <InfoOutline />,
        "success": <SuccessOutline />
    }

    const IconMessageMap={
        "error": <Error />,
        "danger": <Error />,
        "warning": <Warning />,
        "info": <Info />,
        "success": <Success />
    }

    const handleClose=(e)=>{
        setVisible(false);
        onClose?.(e);
    }

    const renderContent=()=>{
        if(type==="notification"){
            return (
                <>
                <div className={`${prefixCls}-Content`}>
                    <div className={`${prefixCls}-Content-Message`}>{message}</div>
                    {description && <div className={`${prefixCls}-Content-Description`}>{description}</div>}
                </div>
                <div className={`${prefixCls}-Action`}>
                    {action}
                </div>
                {closable && <div className={`${prefixCls}-Close`} onClick={handleClose}><CloseOutline /></div>}
                </>
            )
        }else if(type==="message"){
            return (
                <>
                    <div className={`${prefixCls}-Content`}> 
                        {message}
                    </div>
                </>
            )
        }
    }

    return (
        <Collapse visible={visible} unmountOnExit={destroyOnHidden} onExited={afterClose} appear={false} className={className} >
            <Paper
                ref={ref}
                outline={outline}
                className={
                    classNames(
                        className,
                        prefixCls,
                        {
                            [`${prefixCls}-${capitalize(color)}`]: color,
                            [`${prefixCls}-NoOutline`]: !outline,
                            [`${prefixCls}-Center`]: !description,
                            [`${prefixCls}-InlineBlock`]: !block,
                            [`${prefixCls}-InlineBlock`]: !block,
                            [`${prefixCls}-TypeMessage`]: type==="message"
                        }
                    )
                }
                style={style}
            >
                {hasIcon && <div className={`${prefixCls}-Icon`}>{icon || type==="message"?IconMessageMap[color]:IconMap[color]}</div>}
                {renderContent()}
            </Paper>
        </Collapse>
    );
});

export default Alert;