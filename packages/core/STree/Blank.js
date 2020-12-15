

import React from 'react';
import classNames from '@packages/utils/classNames';


//空格组件
const Blank=({prefixCls,level,showLine})=>{
 
    const list=[];
    
    for(let i=0;i<level;i++){
        list.push(
            <span 
                key={`${i}-blank`}
                className={classNames(
                    `${prefixCls}-Blank-Unit`,
                    {
                       [`${prefixCls}-Blank-Unit-ShowLine`]:showLine
                    }
                )}
            />
        )
    }

    return (
        <span className={`${prefixCls}-Blank`}>
            {list}
        </span>
    )

}

export default Blank;