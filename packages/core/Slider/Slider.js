

import React, { useContext } from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

const Slider=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        className,
        color="primary",
        direction="horizontal"
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Slider",customizePrefixCls);

    return (
        <span
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-${capitalize(color)}`]:color
                    }
                )
            }
        >
            <span className={`${prefixCls}-Rail`} />
            <span className={`${prefixCls}-Track`} />
            <input type="hidden" />
            <span 
                className={classNames(
                    `${prefixCls}-Thumb`
                )}  
            />
        </span>
    ); 
});


export default Slider;