import React,{useState,useContext,useEffect,useRef} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext,
} from '@packages/core/ConfigProvider';
import ResizeObserver from '@packages/core/ResizeObserver';
import { isStyleSupport } from '@packages/utils/styleChecker'; 
import Tooltip from '@packages/core/Tooltip';
import { Edit,Check,Copy } from '@packages/core/Icon';
import toArray from '@packages/utils/toArray';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";
import raf,{cancel} from '@packages/utils/raf';

const isLineClampSupport=isStyleSupport("webkitLineClamp");
const isTextOverflowSupport=isStyleSupport("textOverflow");

const ELLIPSIS_STR="...";
const EXPAND_STR="展开";
const EDIT_STR="编辑";
const COPY_STR="复制";
const COPIED_STR="复制成功";

const Typography=React.forwardRef((props,ref)=>{
 
    const {
        children="",
        prefixCls:customizePrefixCls,
        editable,
        ellipsis,
        copyable,
        component:Component,
        color="default",
        ...restProps
    }=props;

    const rafId=useRef(null);
    const contentRef=useRef(null);

    const [edit,setEdit]=useState(false);
    const [ellipsisContent,setEllipsisContent]=useState(null);
    const [copied,setCopied]=useState(false);
    const [isEllipsis,setIsEllipsis]=useState(false);
    const [expanded ,setExpanded ]=useState(false);

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Typography", customizePrefixCls);

    const wrapperDecorations=({mark,code,underline,delete:del,strong,keyboard},content)=>{
        let currentContent=content;

        function wrap(needed,tag){
            if(!needed) return ;

            currentContent=React.createElement(tag,{},currentContent);
        }

        wrap(strong,'strong');
        wrap(underline,'u');
        wrap(del,'del');
        wrap(code,'code');
        wrap(mark,'mark');
        wrap(keyboard,'kbd');

        return currentContent;

    }

    const getEditable=()=>{
        if(!editable) return {editing:edit};

        return {
            editing:edit,
            ...(typeof editable === 'object' ? editable : null)
        }
    };

    const getEllipsis=()=>{
        if(!ellipsis) return {};

        return{
            rows:1,
            expandable:false,
            ...(typeof ellipsis==='object'?ellipsis:null)
        }
    }

    const canUseCSSEllipsis=()=>{
        const {rows,expandable,suffix}=getEllipsis();

        if(suffix) return false;
        //当我们需要地方来放置操作按钮时，无法使用ellipsis。
        if(editable || copyable || expandable){
            return false;
        }

        if(rows===1){
            return isTextOverflowSupport;
        }

        return isLineClampSupport;
    }

    const handleRef=useForkRef(ref,contentRef);

    const renderContent=()=>{
        const { rows,suffix }=getEllipsis();

        const cssEllipsis=canUseCSSEllipsis();
        const cssTextOverflow=rows===1 && cssEllipsis;
        const cssLineClamp=rows&&rows>1&&cssEllipsis;

        let textNode=children;
        //当css ellipsis不支持时 使用js ellipsis

        if(rows && isEllipsis && !expanded && !cssEllipsis){
            textNode=(
                <span>
                    {ellipsisContent}
                    {ELLIPSIS_STR}
                    {suffix}
                </span>
            )
        }else{
            textNode=(
                <>
                    {children}
                    {suffix}
                </>
            )
        }

        textNode=wrapperDecorations(props,textNode);

        return (
            <ResizeObserver >
                <Component 
                    className={
                        classNames(
                            prefixCls,
                            {
                                [`${prefixCls}-${capitalize(color)}`]:color,
                                [`${prefixCls}-Link`]:Component==="a"
                            }
                        )
                    }
                    ref={handleRef}
                    {...restProps}
                >
                    {textNode}
                    {renderOperations()}
                </Component>
            </ResizeObserver>
        )
    }

    const onExpandClick=(e)=>{
        const { onExpand }=getEllipsis();

        setExpanded(true);

        onExpand?.(e);
    }

    const renderExpand=()=>{

        const {expandable,symbol}=getEllipsis();

        if(!expandable) return null;

        return (
            <a
                key="expand"
                className={classNames(`${prefixCls}-Expand`)}
                onClick={onExpandClick}
            >
                {symbol||EXPAND_STR}
            </a>
        )

    }

    const triggerEdit=(edit)=>{
        const {onStart}=this.getEditable();
        if(edit && onStart){
            onStart();
        }
        
    }

    const onEditClick=()=>{
        triggerEdit(true);
    }

    const renderEdit=()=>{
        if(!editable) return ;

        const {icon,tooltip}=getEditable();

        const title=tooltip || EDIT_STR;

        return (
            <Tooltip key="edit" title={tooltip===false?'':title}>
                <div 
                    className={classNames(`${prefixCls}-Edit`)}
                    onClick={onEditClick} 
                >
                    {icon || <Edit />}
                </div>
            </Tooltip>
        )
    }

    const renderCopy=()=>{
        if(!copyable) return ;

        const {tooltips}=copyable;

        let tooltipNodes=toArray(tooltips);

        if(tooltipNodes.length===0){
            tooltipNodes=[COPY_STR,COPIED_STR];
        }else if(tooltipNodes.length===0){
            tooltipNodes=[tooltipNodes[0],tooltipNodes[0]]
        } 

        const title=copied ? tooltipNodes[1]:tooltipNodes[0];
        const icons=toArray(copyable?.icon);

        return (
            <Tooltip key="copy" title={tooltips===false?'':title}>
                <div className={classNames(`${prefixCls}-Copy`)}>
                    {copied ? icons[1] || <Check />:icons[0] || <Copy />}
                </div>
            </Tooltip>
        )
    }

    const renderOperations=()=>{
        return [renderExpand(),renderEdit(),renderCopy()].filter(
            node=>node,
        );
    }

    const { editing }=getEditable();

    if(editing){

    }

    const resizeOnNextFrame=()=>{
        cancel(rafId.current); 
        rafId.current=raf(()=>{
            syncEllipsis();
        });
    }

    const syncEllipsis=()=>{
        const {rows,suffix,onEllipsis}=getEllipsis();
         
        if(canUseCSSEllipsis()) return ;
    }

    useEffect(()=>{
        resizeOnNextFrame()
    },[]);


    return renderContent();

});

export default Typography;