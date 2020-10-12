import React, { useRef, useState, useEffect } from 'react';
import classNames from '@packages/utils/classNames';
import RowContext from './RowContext';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import PropTypes from 'prop-types'; 
import capitalize from '@packages/utils/capitalize';
import ResponsiveObserve, {
    responsiveArray
} from '@packages/utils/responsiveObserve';
import "./index.scss";


const Row = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        children,
        style,
        className,
        gutter:gutterProp = 0,
        align="top",
        justify="start"
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Row", customizePrefixCls);

    const [screens, setScreens] = useState({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
    });

    const gutterRef = useRef(gutterProp);

    useEffect(() => {
        const token = ResponsiveObserve.subscribe(screen => {
            const currentGutter = gutterRef.current || 0;
            if (
                (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
                (Array.isArray(currentGutter) &&
                    (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
            ) {
                setScreens(screen);
            }
        });
        return () => {
            ResponsiveObserve.unsubscribe(token);
        };
    }, []); 

    const getGutter = () => {
        const results = [0, 0];
        const normalizedGutter = Array.isArray(gutterProp) ? gutterProp : [gutterProp, 0];
        normalizedGutter.forEach((g, index) => {
            if (typeof g === 'object') {
                for (let i = 0; i < responsiveArray.length; i++) {
                    const breakpoint = responsiveArray[i]; 
                    if (screens[breakpoint] && g[breakpoint] !== undefined) {
                        results[index] = g[breakpoint];
                        break;
                    }
                }
            } else {
                results[index] = g || 0;
            }
        });
        return results;
    };

    const gutter = getGutter(); 

    const rowStyle={
        ...(gutter[0]>0?{
            marginLeft:gutter[0]?gutter[0]/-2:undefined,
            marginRight:gutter[0]?gutter[0]/-2:undefined
        }:{}),
        ...(gutter[1]>0?{
            marginTop: gutter[1]?gutter[1]/ -2:undefined,
            marginBottom: gutter[1]?gutter[1]/ 2:undefined,
        }:{}),
        ...style
    } 

    return (
       <RowContext.Provider value={{ gutter }}>
            <div style={rowStyle} className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-${capitalize(align)}`]: align,
                    [`${prefixCls}-${capitalize(justify)}`]: justify
                }
            )}   ref={ref}>
                {children}
            </div>
       </RowContext.Provider>
    )
});

Row.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    style: PropTypes.object,
    gutter:PropTypes.any,
    align:PropTypes.string,
    justify:PropTypes.string
};

export default Row;