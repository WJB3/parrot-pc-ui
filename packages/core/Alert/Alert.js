
import React , { useCallback, useContext } from 'react';
import { ConfigContext } from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';
import {
    OutlineWarning,
    OutlineError,
    OutlineInfo,
    OutlineSuccess
} from '@packages/core/Icon';
import Paper from '@packages/core/Paper';
import "./index.scss";

const Alert=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        outline,
        className,
        children,
        color="primary"
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Alert",customizePrefixCls);

    const hasIcon=color==="error"||color==="danger"||color==="warning"||color==="info"||color==="success";

    const IconMap={
        "error":<OutlineError />,
        "danger":<OutlineError />,
        "warning":<OutlineWarning />,
        "info":<OutlineInfo />,
        "success":<OutlineSuccess />
    }

    return (
        <Paper
            ref={ref}
            outline={outline}
            className={
                classNames(
                    className,
                    prefixCls,
                    {
                        [`${prefixCls}-${capitalize(color)}`]:color
                    }
                )
            }
        >
            {hasIcon && IconMap[color]}
            <div className={`${prefixCls}-Message`}>{children}</div> 
        </Paper>
    );
});

export default Alert;