import React from 'react';
import RippleBase from '@packages/core/ButtonBase';
import Icon from '@packages/icon';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <RippleBase>
            <div style={{width:500,height:500,border:"1px solid blue"}}></div>
        </RippleBase>
    </React.Fragment>
});

export default Page;