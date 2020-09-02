import React, { useRef, useState, useEffect, cloneElement } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes, { element } from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import childrenToArray from '@packages/utils/childrenToArray';


import "./index.scss";


const BreadcrumbItem = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        style,
        separator = "/"
    } = props;

    const prefixCls = usePrefixCls('BreadcrumbItem', customizePrefixCls)

    return (
        <span className={classNames(prefixCls, className)} style={style}> 
                <span className={classNames(`${prefixCls}-Link`)}>
                    {children}
                </span>
                {
                    separator && separator !== '' && (
                        <span className={`${prefixCls}-Separator`}>{separator}</span>
                    )
                }
        </span>
    )
});

BreadcrumbItem.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    style: PropTypes.object,
    separator: PropTypes.any
};

export default BreadcrumbItem;