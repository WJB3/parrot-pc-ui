import React, { useRef, useState, useEffect } from 'react';
import classNames from '@packages/utils/classNames';
import RowContext from './RowContext';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";


function parseFlex(flex) {
    if (typeof flex === 'number') {
        return `${flex} ${flex} auto`;
    }

    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
    }

    return flex;
}

const Col = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        children,
        className,
        span,
        order,
        offset,
        push,
        pull,
        flex,
        style,
        ...others
    } = props;

    const prefixCls = usePrefixCls('Col', customizePrefixCls);

    let sizeClassObj = {};

    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
        let sizeProps = {};
        const propSize = props[size];

        if (typeof propSize === 'number') {
            sizeProps.span = propSize;
        } else if (typeof propSize === 'object') {
            sizeProps = propSize || {};
        }

        delete others[size];

        sizeClassObj = {
            ...sizeClassObj,
            [`${prefixCls}-${capitalize(size)}-${sizeProps.span}`]: sizeProps.span !== undefined,
            [`${prefixCls}-${capitalize(size)}-Order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
            [`${prefixCls}-${capitalize(size)}-Offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
            [`${prefixCls}-${capitalize(size)}-Pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
            [`${prefixCls}-${capitalize(size)}-Push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        }
    })

    return (
        <RowContext.Consumer>
            {({gutter}) => {
                let mergedStyle = { ...style }; 

                if (gutter) {
                    mergedStyle = {
                        ...(gutter[0] > 0
                            ? {
                                paddingLeft: gutter[0]?gutter[0] / 2:undefined,
                                paddingRight: gutter[0]?gutter[0] / 2:undefined,
                            }
                            : {}),
                        ...(gutter[1] > 0
                            ? {
                                paddingTop: gutter[1]?gutter[1] / 2:undefined,
                                paddingBottom: gutter[1]?gutter[1] / 2:undefined,
                            }
                            : {}),
                        ...mergedStyle
                    }
                }

                if (flex) {
                    mergedStyle.flex = parseFlex(flex);
                }

                return (
                    <div style={mergedStyle} className={classNames(
                        prefixCls,
                        className,
                        {
                            [`${prefixCls}-${span}`]: span !== undefined,
                            [`${prefixCls}-Order-${order}`]: order,
                            [`${prefixCls}-Pull-${pull}`]: pull,
                            [`${prefixCls}-Push-${push}`]: push,
                            [`${prefixCls}-Offset-${offset}`]: offset,
                        },
                        sizeClassObj
                    )} ref={ref}>
                        {children}
                    </div>
                );
            }}
        </RowContext.Consumer>
    )
});

Col.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    style: PropTypes.object
};

export default Col;