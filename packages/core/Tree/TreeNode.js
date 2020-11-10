
import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import Blank from './Blank';
import { TreeContext } from './TreeContext';


const TreeNode=(props)=>{

    const {
        className,
        prefixCls,
        eventKey,
        expanded,
        switchIcon:switchIconProp
    }=props;

    const {
        keyEntities
    }=useContext(TreeContext);

    const { level }=keyEntities[eventKey];

    const renderSwitch=()=>{

    }

    return (
        <div 
            className={
                classNames(
                    className,
                    `${prefixCls}-TreeNode`
                )
            }
        >
            <Blank prefixCls={`${prefixCls}-TreeNode`} level={level} />
            {renderSwitch()}
        </div>
    )

}

export default TreeNode;