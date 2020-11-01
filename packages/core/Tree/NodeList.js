
import React from 'react';

const NodeList=React.forwardRef((props,ref)=>{

    const {
        prefixCls
    }=props;

    return (
        <> 
            <div 
                className={`${prefixCls}-TreeNode`}
            >
                
            </div>
        </>
    )

});

export default NodeList;