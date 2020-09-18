import React from 'react';

export const svgBaseProps={
    width:"1em",
    height:"1em",
    fill:"currentColor"
} 

export function normalizeAttrs(attrs={}){
    return Object.keys(attrs).reduce((acc,key)=>{
        const val=attrs[key];
        switch(key){
            case "class":
                acc.className=val;
                delete acc.class;
                break;
            default:
                acc[key]=val;
        }
        return acc;
    },{});
}

export function generate(node,key,rootProps){
    if(!rootProps){
        return React.createElement(
            node.tag,
            {
                key,
                ...normalizeAttrs(node.attrs)
            },
            (node.children||[]).map((child,index)=>generate(child,`${key}-${node.tag}-${index}`))
        );
    }

    return React.createElement(
        node.tag,
        {
            key,
            ...normalizeAttrs(node.attrs),
            ...rootProps
        },
        (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)),
    )
}