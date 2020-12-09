

import React from 'react'; 


//空格组件
const Blank=React.memo(({prefixCls,level})=>{
 
    const list=[];
    
    for(let i=0;i<level;i++){
        list.push(
            <span 
                key={`${i}-blank`}
                className={`${prefixCls}-Blank-Unit`}
            />
        )
    }

    console.log("renderBlank")

    return (
        <span className={`${prefixCls}-Blank`}>
            {list}
        </span>
    )

})

export default Blank;