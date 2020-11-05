
import React from 'react';
import PropTypes from 'prop-types'; 

const List=React.forwardRef((props,ref)=>{

    const {
        height
    }=props;


});

List.propTypes = {
    //显示区域的容器高度
    height:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default List;