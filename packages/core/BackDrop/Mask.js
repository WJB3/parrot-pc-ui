import React from 'react';
import classNames from '@packages/utils/classNames';

const Mask=React.forwardRef((props,ref)=>{ 
    const { prefixCls,transparent,...restProps }=props;
    return (
        <div className={classNames(`${prefixCls}-Mask`,{[`${prefixCls}-NoTransparent`]:!transparent})} ref={ref} {...restProps}></div>
    )
});

export default Mask;