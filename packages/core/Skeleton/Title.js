import React from 'react';
import classNames from '@packages/utils/classNames';

const Title=({prefixCls,className,width,style})=>(
    <h3 className={classNames(prefixCls,className)} style={{width,...style}}></h3>
);

export default Title;