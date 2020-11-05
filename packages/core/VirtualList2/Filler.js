
import React from 'react';  


const Filler=(props)=>{

    const {
        height,
        offset, 
        children
    }=props;

    let outerStyle={}; 

    if(offset!==undefined){
        outerStyle={height,position:"relative",overflow:"hidden",transform:`translateY(${offset}px)`};
    }
    
    return (
        <div style={outerStyle}  >
            {children} 
        </div>
    )
};

export default Filler;