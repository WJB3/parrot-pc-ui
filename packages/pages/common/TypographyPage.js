import React from 'react';
import Typography,{Text,Title,Paragraph} from '@packages/core/Typography';
 
// import { Typography as TypographyA } from 'antd';

// const { Paragraph } = TypographyA;
 


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
      
        <Paragraph ellipsis={{
            expandable:true,
            rows:1, 
            suffix:"--wjb" 
        }} >
            Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
            Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
            a design language for background applications, is refined by Ant UED Team. Ant Design, a
            design language for background applications, is refined by Ant UED Team. Ant Design, a design
            language for background applications, is refined by Ant UED Team. Ant Design, a design
            language for background applications, is refined by Ant UED Team.
        </Paragraph>

    </React.Fragment>
});

export default Page;