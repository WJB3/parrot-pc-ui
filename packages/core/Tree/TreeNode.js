
import React ,{useContext} from 'react'; 
import Blank from './Blank';
import { TreeContext } from './TreeContext';
import classNames from '@packages/utils/classNames';
import Checkbox from '@packages/core/Checkbox';
 

const TreeNode=(props)=>{

    const {
        className, 
        eventKey,
        expanded,
        title,
        data:dataProp,
        icon,
    }=props;

    const {
        keyEntities,
        prefixCls,
        titleRender,
        showIcon,
        switcherIcon
    }=useContext(TreeContext);

    const prefixClsTreeNode=`${prefixCls}-TreeNode`;

    const { level }=keyEntities[eventKey];

    const renderSwitcher=()=>{
        return (
            <span className={classNames(
                `${prefixClsTreeNode}-Switcher`,
                `${prefixClsTreeNode}-Switcher-${expanded?"Open":"Close"}`
            )}>
                {
                    typeof switcherIcon==="function"
                    ?switcherIcon(props)
                    :switcherIcon
                }
            </span>
        )
    }

    const renderCheckbox=()=>{
        return (<Checkbox>

        </Checkbox>)
    }

    const renderIcon=()=>{

        let iconNode=null;
        if(showIcon){
            
            if(typeof icon==="function"){
                iconNode=icon(dataProp);
            }else{
                iconNode=icon;
            }
        }
        
        return (
            <span className={classNames(`${prefixClsTreeNode}-IconEle`)}>
                {iconNode}
            </span>
        )
    }

    const renderTitle=()=>{

        let titleNode;
        if(typeof title==="function"){
            titleNode=title(dataProp);
        }else if(titleRender){
            titleNode=titleRender(dataProp);
        }else{
            titleNode=title;
        }

        return <span className={`${prefixClsTreeNode}-Title`}>{titleNode}</span>
    }

    const renderSelector=()=>{

        return <span>
            {renderIcon()}
            {renderTitle()}
        </span>
    }

    return (
        <span 
            title={typeof title==="string"?title:""}
            className={
                classNames(
                    className,
                    prefixClsTreeNode
                )
            }
        >
            <Blank prefixCls={`${prefixCls}-TreeNode`} level={level} />
            {renderSwitcher()}
            {renderCheckbox()}
            {renderSelector()}
        </span>
    )

}

export default TreeNode;