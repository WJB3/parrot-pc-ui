import React from 'react';
import Typography from './Typography';

const TITLE_ELE_LIST=[1,2,3,4,5];

const Title=((props)=>{

    const {level=1,...restProps}=props;

    let component;

    if(TITLE_ELE_LIST.indexOf(level)!==-1){
        component=`h${level}`
    }else{
        component=`h1`;
    }

    return <Typography {...restProps}  component={component}/>
})

export default Title;