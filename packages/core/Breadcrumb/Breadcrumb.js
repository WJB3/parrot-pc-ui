import React, { useRef, useState, useEffect, cloneElement } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes, { element } from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import childrenToArray from '@packages/utils/childrenToArray';
 

import "./index.scss";

 
const Breadcrumb = React.forwardRef((props, ref) => {
    
    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        style,
        separator="/" 
    } = props;

    const prefixCls = usePrefixCls('Breadcrumb', customizePrefixCls)     
  

    return (
        <div className={classNames(className,prefixCls)} style={style} ref={ref}>
            {
                childrenToArray(children).map((element,index)=>{
                    if(!element){
                        return element;
                    }

                    return cloneElement(element,{
                        separator,
                        key:index
                    })
                })
            }
        </div>
    )
});

Breadcrumb.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children:PropTypes.any,
    style:PropTypes.object,
    separator:PropTypes.any
};

export default Breadcrumb;