import React from 'react';
import SvgIcon from '../template/SvgIcon';

export default function createSvgIcon(path){
    const Component=(props,ref)=>{
        <SvgIcon ref={ref} {...props}>
            {path}
        </SvgIcon>
    }

    return React.memo(React.forwardRef(Component));
}