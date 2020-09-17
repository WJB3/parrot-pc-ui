

export const svgBaseProps={
    width:"1em",
    height:"1em",
    fill:"currentColor"
}

export function generate(node,key,rootProps){
    if(!rootProps){
        return React.cleateElement(
            node.tag,
            {key},
            (node.children||[]).map((child,index)=>generate(child,`${key}-${node.tag}-${index}`))
        );
    }

    return React.cleateElement(
        node.tag,
        {key,...rootProps},
        (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)),
    )
}