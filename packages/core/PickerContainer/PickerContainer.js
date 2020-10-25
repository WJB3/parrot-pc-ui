
import React,{useContext} from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import Paper from '@packages/core/Paper';
import "./index.scss";

const PickerContainer=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        display,
        container,
        displayName,
        containerName,
        landspace
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("PickerContainer",customizePrefixCls);

    return (
        <Paper
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-Landspace`]:landspace
                    }
                )
            }
            ref={ref}
        >
            <div className={classNames(
                    `${prefixCls}-Display`, 
                    displayName
            )}>{display}</div>
            <div className={classNames(
                    `${prefixCls}-Container`, 
                    containerName
            )}>{container}</div>
        </Paper>
    );
});

export default PickerContainer;

