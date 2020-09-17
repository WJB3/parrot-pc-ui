import React from 'react';
import {
    generate
} from '../utils';

const IconBase=(props)=>{

    const {
        className
    }=props;

    return generate(target.icon,`svg-${target.name}m`,{
        className,
    })

}