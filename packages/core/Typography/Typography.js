import React,{useState,useContext,useEffect,useRef} from 'react';
import classNames from '@packages/utils/classNames';
import { findDOMNode } from 'react-dom';
import {
    ConfigContext,
} from '@packages/core/ConfigProvider';
import ResizeObserver from '@packages/core/ResizeObserver';
import { isStyleSupport } from '@packages/utils/styleChecker'; 
import Tooltip from '@packages/core/Tooltip';
import { Edit,Check,Copy } from '@packages/core/Icon';
import toArray from '@packages/utils/toArray';
import capitalize from '@packages/utils/capitalize';
import measure from './measure';

import "./index.scss";

import raf from '@packages/utils/raf';
import useForkRef from '@packages/hooks/useForkRef';
const isLineClampSupport=isStyleSupport("webkitLineClamp");
const isTextOverflowSupport=isStyleSupport("textOverflow");


const ELLIPSIS_STR="...";
const EXPAND_STR="展开";
const SHRINK_STR="收起";
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
        style,
        ...restProps
    }=props;

    const rafId=useRef(null);
    const contentRef=useRef(null);

    const [edit,setEdit]=useState(false);
    
    const [copied,setCopied]=useState(false);
    
    const [expanded ,setExpanded ]=useState(false);

    const [ellipsisText,setEllipsisText]=useState("");
    const [ellipsisContent,setEllipsisContent]=useState(null);
    const [isEllipsis,setIsEllipsis]=useState(false);

    const [clientRendered,setClientRendered]=useState(false);
    

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
        const {rows,expandable,suffix,onEllipsis}=getEllipsis();
        //如果有后缀 不使用css ellipsis
        if(suffix) return false;
        //当我们需要地方来放置操作按钮时，无法使用css ellipsis。
        if(editable || copyable || expandable || onEllipsis || !clientRendered){
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
        const cssLineClamp=rows && rows>1 && cssEllipsis;

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
            <ResizeObserver onResize={resizeOnNextFrame}>
                <Component 
                    className={
                        classNames(
                            prefixCls,
                            {
                                [`${prefixCls}-${capitalize(color)}`]:color,
                                [`${prefixCls}-Link`]:Component==="a",
                                [`${prefixCls}-Ellipsis`]:rows,
                                [`${prefixCls}-Ellipsis-Single-Line`]:cssTextOverflow,
                                [`${prefixCls}-Ellipsis-Multiple-Line`]:cssLineClamp,
                            }
                        )
                    }
                    style={{
                        ...style,
                        WebkitLineClamp:cssLineClamp?rows:null
                    }}
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
        const { onExpand,onShrink }=getEllipsis();

        if(expanded){
            onShrink?.(e);
        }else{
            onExpand?.(e);
        }

        setExpanded(!expanded);

        
    }

    const renderExpand=(forceRender)=>{

        const {expandable,symbol}=getEllipsis();

        if(!expandable) return null;

        if (!forceRender && !isEllipsis) return null;

        return (
            <a
                key="expand"
                className={classNames(`${prefixCls}-Expand`)}
                onClick={onExpandClick}
            >
                {expanded?(symbol?.[1]||SHRINK_STR):(symbol?.[0]||EXPAND_STR)} 
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

    const renderOperations=(forceRenderExpanded)=>{
        return [renderExpand(forceRenderExpanded),renderEdit(),renderCopy()].filter(
            node=>node,
        );
    }

    const { editing }=getEditable();

    if(editing){

    }

    const resizeOnNextFrame=()=>{
        raf.cancel(rafId.current); 
        rafId.current=raf(()=>{
            syncEllipsis();
        }); 
    }

    const syncEllipsis=()=>{ 

        const {rows,suffix,onEllipsis}=getEllipsis();

        if(!rows || rows<0 || !contentRef.current || expanded) return ;
         
        if(canUseCSSEllipsis()) return ;  
 
        const {content,text,ellipsis}=measure(
            findDOMNode(contentRef.current),
            {rows,suffix},
            children,
            renderOperations(true),
            ELLIPSIS_STR
        );   
        if(ellipsisText!==text || isEllipsis !==ellipsis){
            setIsEllipsis(ellipsis);
            setEllipsisContent(content);
            setEllipsisText(text);

            if(isEllipsis!==ellipsis && onEllipsis){ 
                onEllipsis(ellipsis);
            }
        }
    }

    useEffect(()=>{
        setClientRendered(true);
        resizeOnNextFrame()
    },[]);


    return renderContent();

});

export default Typography;