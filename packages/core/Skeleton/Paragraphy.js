
import React from 'react';
import classNames from '@packages/utils/classNames';

const Paragraph=(props)=>{

    const {
        prefixCls,
        className,
        style,
        rows,
        width
    }=props;

    const getWidth=(index)=>{
        if(Array.isArray(width)){
            return width[index];
        }

        if(rows-1===index){
            return width;
        }

        return undefined;
    }

    const rowList=[...Array(rows)].map((_,index)=>(
        <li key={index} style={{width:getWidth(index)}}></li>
    ))

    return (
        <ul className={classNames(prefixCls,className)} style={style}>
            {rowList}
        </ul>
    )

}

export default Paragraph;