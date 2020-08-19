import React from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import capitalize from '@packages/utils/capitalize';
import "./importIcons"; 
import "./index.scss";
 
const Icon=React.forwardRef((IconProps,ref)=>{

    const {
        name, 
        onClick=()=>{},
        prefixCls:customizePrefixCls,
        className
    }=IconProps; 

    const prefixCls = usePrefixCls('Icon', customizePrefixCls);

    return(
        <i  className={classNames(prefixCls,className)} onClick={(e)=>onClick(e)} ref={ref}>
            <svg width={"1em"} height={"1em"} fill={"currentcolor"} >
                <use xlinkHref={`#${name}`}></use>
            </svg>
        </i>
    )
});

Icon.propTypes={
    name:PropTypes.string,
    onClick:PropTypes.func,
    className:PropTypes.string,
    prefixCls:PropTypes.string
}

export default Icon;