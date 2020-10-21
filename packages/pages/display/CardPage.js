import React,{useEffect, useRef,useState} from 'react';
import Button from '@packages/core/Button';
import Card from '@packages/core/Card';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';

  

const Page = React.forwardRef((props, ref) => {

    const demoRef=useRef(null);
    const [count,setCount]=useState(9);

    return <React.Fragment>

        <div style={{padding:200}}>

        <Card>
            <Card.Title>{"a"}</Card.Title>
        </Card>
           
        </div>
    </React.Fragment>
});

export default Page;