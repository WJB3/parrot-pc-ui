import React, { useRef, useState, useEffect } from 'react';
import classNames from '@packages/utils/classNames';
import RowContext from './RowContext';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import ResponsiveObserve, {
    responsiveArray
} from '@packages/utils/responsiveObserve';
import "./index.scss";


function parseFlex(flex){
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
    } = props;

    const prefixCls = usePrefixCls('Col', customizePrefixCls);

    return (
        <RowContext.Consumer >
            {(gutter) => {
                let mergedStyle= { ...style };
                 
                if (flex) {
                    mergedStyle.flex = parseFlex(flex);
                }

                return (
                    <div  style={mergedStyle} className={classNames(
                        prefixCls,
                        className,
                        {
                            [`${prefixCls}-${span}`]: span !== undefined,
                        }
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