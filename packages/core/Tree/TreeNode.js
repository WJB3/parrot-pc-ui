
import React from 'react';
import classNames from '@packages/utils/classNames';
import Blank from './Blank';


const TreeNode=(props)=>{

    const {
        className,
        prefixCls
    }=props;

    return (
        <div 
            className={
                classNames(
                    className,
                    `${prefixCls}-TreeNode`
                )
            }
        >
            <Blank prefixCls={`${prefixCls}-TreeNode`} />
        </div>
    )

}

export default TreeNode;