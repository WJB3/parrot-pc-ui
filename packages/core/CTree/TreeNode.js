
import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import { TreeContext } from './TreeContext';
import Blank from './Blank';

//外部遍历避免重复生成 
const noop=()=>{};

const TreeNode=React.forwardRef((props,ref)=>{

    const {
        eventKey
    }=props;

    const {
        keyEntities
    }=useContext(TreeContext);
 

    const { children,level }=keyEntities[eventKey]; 

    const onExpand=(e)=>{
        onNodeExpand?.(e,{...keyEntities[eventKey],expanded,key:eventKey})
    }
 
    const renderSwitcher=()=>{
 
        let switchNode=null;

        let hasChildren=(children||[]).length>0;

        //如果是叶子节点，前面就没有切换图标
        if(!hasChildren){
            switchNode=null;
        }else{
            switchNode= typeof switcherIcon==="function"
            ?switcherIcon(props)
            :switcherIcon
        } 

        return (
            <span className={classNames(
                `${className}-Switcher`,
                `${className}-Switcher-${expanded?"Open":"Close"}`
            )} onClick={hasChildren?onExpand:noop}> 
                {switchNode}
            </span>
        )
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
            <span className={classNames(`${className}-IconEle`)}>
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

        return <span className={`${className}-Title`}>{titleNode}</span>
    }

    const onSelect=(e)=>{
        onNodeSelect?.(e,{...keyEntities[eventKey],key:eventKey,selected});
    }


    const renderSelector=()=>{

        return <span className={classNames(`${className}-Selector`,{
            [`${className}-Selector-BlockNode`]:blockNode,
            [`${className}-Selector-Selected`]:selected,
            [`${className}-Selector-FilterNode`]:filterTreeNode && filterTreeNode({...props})
        })} onClick={onSelect}>
            {renderIcon()}
            {renderTitle()}
        </span>
    }

    console.log("renderTreeNode") 
     

    return (
        <span 
            title={typeof title==="string"?title:""}
            className={className}
            ref={ref}
        >
            <Blank prefixCls={className} level={level} />
            {renderSwitcher()}
            {renderSelector()}
        </span>
    )


});

export default React.memo(TreeNode);