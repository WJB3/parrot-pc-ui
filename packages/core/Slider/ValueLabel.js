

import React from 'react';
import classNames from '@packages/utils/classNames';
import { Zoom } from '@packages/core/Transition';

const ValueLabel=React.forwardRef((props,ref)=>{
    const {
        children,
        className,
        open,
        value
    }=props;

    return React.cloneElement(
        children,
        {
            className:classNames(
                children.props.className,
                {
                    ['open']:open,
                }, 
            ),
            ref:ref
        },
        <Zoom in={open} extraStyle={"translateY(-10px)"}>
            <span className={classNames(`${className}-Offset`,className)}>
                <span className={classNames(`${className}-Circle`)}>
                    <span className={`${className}-Label`}>
                        {value}
                    </span>
                </span>
            </span>
        </Zoom>
        
    )
});

export default ValueLabel;