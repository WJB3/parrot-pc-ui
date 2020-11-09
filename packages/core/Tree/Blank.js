

import React from 'react';
import classNames from '@packages/utils/classNames';


//空格组件
const Blank=({prefixCls,level})=>{
 
    const list=[];
    
    for(let i=0;i<level;i++){
        list.push(
            <span 
                key={`${i}-blank`}
                className={classNames(
                    `${prefixCls}-Blank-Unit`
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