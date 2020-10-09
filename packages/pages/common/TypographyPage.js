import React from 'react';
import Typography,{Text,Title,Paragraph} from '@packages/core/Typography';
import Space from '@packages/core/Space';
 


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        {/* <Space direction={"vertical"}>
            <Text>Ant Design (default)</Text>
            <Text color="primary">Ant Design (primary)</Text>
            <Text color="warning">Ant Design (warning)</Text>
            <Text color="danger">Ant Design (danger)</Text>
            <Text mark >Ant Design (mark)</Text>
            <Text code >Ant Design (code)</Text>
            <Text keyboard >Ant Design (keyboard)</Text>
            <Text underline >Ant Design (underline)</Text>
            <Text delete >Ant Design (delete)</Text>
            <Text strong >Ant Design (strong)</Text>
        </Space> */}
        {/* <Space direction={"vertical"}>
            <Title>h1. Ant Design</Title>
            <Title level={2}>h2. Ant Design</Title>
            <Title level={3}>h3. Ant Design</Title>
            <Title level={4}>h4. Ant Design</Title>
            <Title level={5}>h5. Ant Design</Title>
        </Space> */}
        <Paragraph ellipsis>
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