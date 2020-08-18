
import React from 'react';

export default function childrenToArray(children){

    let ret=[];

    React.Children.forEach(children,(c)=>{
        ret.push(c);
    });

    return ret;

}