import React, { useRef, useState, useEffect } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
 
import "./index.scss";
 
 

const Row = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        children,
        style, 
        className
    } = props;

   
    return (
       
        
    )
});

Row.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    style:PropTypes.object
};

export default Row;