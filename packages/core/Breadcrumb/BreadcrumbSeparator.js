import React, { useRef, useState, useEffect, cloneElement } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';  
import "./index.scss";


const BreadcrumbSeparator = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        style,
        separator = "/"
    } = props;

    const prefixCls = usePrefixCls('BreadcrumbSeparator', customizePrefixCls)

    return (
        <span className={classNames(prefixCls, className)} style={style}> 
            {children || '/'}
        </span>
    )
});

BreadcrumbSeparator.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    style: PropTypes.object,
    separator: PropTypes.any
};

export default BreadcrumbSeparator;