
import React ,{useContext} from 'react'; 
import Blank from './Blank';
import { TreeContext } from './TreeContext';
import classNames from '@packages/utils/classNames';
import Checkbox from '@packages/core/Checkbox';
 
const noop=()=>{};

const TreeNode=React.forwardRef((props,ref)=>{

    const { 
        eventKey, 
    }=props;

    const {
        keyEntities,
        prefixCls,
        titleRender,
        showIcon,
        switcherIcon,
        expandedKeys, 
        checkedKeys,
        halfCheckedKeys,
        onNodeExpand,
        onNodeCheck,
        checkable, 
        blockNode,
        selectedKeys,
        onNodeSelect,
        filterTreeNode
    }=useContext(TreeContext);

    const prefixClsTreeNode=`${prefixCls}-TreeNode`;

    const { level,node:{title},children }=keyEntities[eventKey]; 

    const expanded=expandedKeys.indexOf(eventKey)>-1;
    const checked=checkedKeys.indexOf(eventKey)>-1;
    const halfChecked=halfCheckedKeys.indexOf(eventKey)>-1;
    const selected=selectedKeys.indexOf(eventKey)>-1;

    const onExpand=(e)=>{
        onNodeExpand?.(e,{...keyEntities[eventKey],expanded,key:eventKey})
    }

    const onCheck=(flag)=>{
        onNodeCheck?.(flag,{key:eventKey});
    }   

    const onSelect=(e)=>{
        onNodeSelect?.(e,{key:eventKey});
    }

    const renderSwitcher=()=>{
 
        let switchNode=null;

        let hasChildren=(children||[]).length>0;

        if(!hasChildren){
            switchNode=null;
        }else{
            switchNode= typeof switcherIcon==="function"
            ?switcherIcon(props)
            :switcherIcon
        }

        return (
            <span className={classNames(
                `${prefixClsTreeNode}-Switcher`,
                `${prefixClsTreeNode}-Switcher-${expanded?"Open":"Close"}`
            )} onClick={hasChildren?onExpand:noop}> 
                {switchNode}
            </span>
        )
    }

    const renderCheckbox=()=>{

        if(!checkable) return null;

        return (<Checkbox
            className={classNames(
                `${prefixClsTreeNode}-Checkbox`
            )} 
            checked={checked}
            indeterminate={halfChecked}
            onChange={onCheck}
        />)
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

        return <span className={classNames(`${prefixClsTreeNode}-Selector`,{
            [`${prefixClsTreeNode}-Selector-BlockNode`]:blockNode,
            [`${prefixClsTreeNode}-Selector-Selected`]:selected,
            [`${prefixClsTreeNode}-Selector-FilterNode`]:filterTreeNode && filterTreeNode({...props,key:eventKey})
        })} onClick={onSelect}>
            {renderIcon()}
            {renderTitle()}
        </span>
    }

    return (
        <span 
            title={typeof title==="string"?title:""}
            className={
                classNames( 
                    prefixClsTreeNode
                )
            }
            ref={ref}
        >
            <Blank prefixCls={`${prefixClsTreeNode}`} level={level} />
            {renderSwitcher()}
            {renderCheckbox()}
            {renderSelector()}
        </span>
    )

});

export default TreeNode;