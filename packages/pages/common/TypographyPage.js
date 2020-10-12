import React, { useEffect } from 'react';
import Typography,{Text,Title,Paragraph} from '@packages/core/Typography';
import {
    Favorite,
    FavoriteOutline
} from '@packages/core/Icon';
import useBreakpoint from '@packages/hooks/useBreakpoint';
 
// import { Typography as TypographyA } from 'antd';

// const { Paragraph } = TypographyA;
 


const Page= React.forwardRef((props,ref)=>{

    const size=useBreakpoint(); 

    return <React.Fragment>
       
       <Paragraph editable={{ onChange: (value)=>console.log(value) }}>This is an editable text.</Paragraph>
        <Paragraph copyable={{
            icon:[<FavoriteOutline />,<Favorite />],
            tooltips:["爱心","biu、biu、biu~"],
            onCopy:()=>{console.log("copy成功")}
        }} style={{marginTop:"200px"}}>asdasdasd.</Paragraph>

    </React.Fragment>
});

export default Page;