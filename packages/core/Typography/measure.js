
import toArray from '@packages/utils/toArray';
import { fixControlledValue, } from 'antd/lib/input/Input';
import { render,unmountComponentAtNode } from 'react-dom';

let ellipsisContainer;

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
//注释节点
const COMMENT_NODE = 8;

function styleToString(style){
    const styleNames=Array.prototype.slice.apply(style);

    return styleNames.map(name=>`${name}:${style.getPropertyValue(name)};`).join("");
}

function pxToNumber(value){
    if(!value) return 0;
    const match=value.match(/^\d*(\.\d*)?/);
    return match?Number(match[0]):0;
}

function mergeChildren(children){
    const childList=[];
    children.forEach((child)=>{
        const prevChild=childList[childList.length-1];
        if(typeof child==='string' && typeof prevChild==='string'){
            childList[childList.length-1]+=child;
        }else{
            childList.push(child);
        }
    });
    return childList;
}

const wrapperStyle={
    padding:0,
    margin:0,
    display:"inline",
    lineHeight:"inherit"
}

export default function measure(
    originElem,
    option,
    content,
    fixedContent,
    ellipsisStr
){
    if(!ellipsisContainer){
        ellipsisContainer=document.createElement("div");
        document.body.appendChild(ellipsisContainer);
    }

    const { rows,suffix='' }=options;

    const originStyle=window.getComputedStyle(originElem);
    const originCSS=styleToString(originStyle);
    const lineHeight=pxToNumber(originStyle.lineHeight);
    const maxHeight=Math.round(
        lineHeight * (rows+1)+
        pxToNumber(originStyle.paddingTop)+
        pxToNumber(originStyle.paddingBottom),
    );

    ellipsisContainer.setAttribute("style",originCSS);
    ellipsisContainer.style.position="fixed";
    ellipsisContainer.style.left="0";
    ellipsisContainer.style.height="auto";
    ellipsisContainer.style.minHeight="auto";
    ellipsisContainer.style.maxHeight="auto";
    ellipsisContainer.style.top="-999999px";
    ellipsisContainer.style.zIndex="-1000";

    ellipsisContainer.style.textOverflow="clip";
    ellipsisContainer.style.whiteSpace="normal";
    ellipsisContainer.style.webkitLineClamp="none";

    const contentList=mergeChildren(toArray(content));
    render(
        <div style={wrapperStyle}>
            <span style={wrapperStyle}>
                {contentList}
                {suffix}
            </span>
            <span style={wrapperStyle}>{fixedContent}</span>
        </div>,
        ellipsisContainer
    );

    function inRange(){
        return ellipsisContainer.offsetHeight<maxHeight;
    }

    if(inRange()){
        unmountComponentAtNode(ellipsisContainer);
        return {
            content,
            text:ellipsisContainer.innerHTML,
            ellipsis:false
        };
    };

    const childNodes=Array.prototype.slice
        .apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes)
        .filter(({nodeType})=>nodeType!==COMMENT_NODE);

    const fixedNodes=Array.prototype.slice.apply(
        ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes,
    );

    unmountComponentAtNode(ellipsisContainer);

    const ellipsisChildren=[];
    ellipsisChildren.innerHTML='';

    const ellipsisContentHolder=document.createElement("span");
    ellipsisContainer.appendChild(ellipsisContentHolder);


}