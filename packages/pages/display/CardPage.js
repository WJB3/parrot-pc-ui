import React,{useEffect, useRef,useState} from 'react';
import Button from '@packages/core/Button';
import Avatar from '@packages/core/Avatar';
import Card from '@packages/core/Card';
import ButtonBase from '@packages/core/ButtonBase';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';

  

const Page = React.forwardRef((props, ref) => {

    const demoRef=useRef(null);
    const [count,setCount]=useState(9);

    return <React.Fragment>

        <div style={{padding:200}}>

        <Card>
            <Card.Header 
                title="我是Card的标题"
                subtitle="我是Card的副标题"
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                }
                actions={
                    <Button size="small" type="text" color="primary">{"测试"}</Button>
                }
            
            />
            <Card.Action>
                <Card.Meta 
                    image={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603294992213&di=375b2710ba02346bf1e8ede2115c81ff&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20%2F225%2Fw1209h616%2F20180507%2F8f83-hacuuvu6242181.png"}
                    height={200}
                />
                <Card.Content>
                    {"我是正儿八经的内容"}
                </Card.Content>
            </Card.Action>
            <Card.Bottom >
                <Button size="small" type="text" color="primary">{"测试"}</Button>
            </Card.Bottom>

        </Card>
           
        </div>
    </React.Fragment>
});

export default Page;