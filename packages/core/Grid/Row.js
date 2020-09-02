import React, { useRef, useState, useEffect } from 'react';
import classNames from '@packages/utils/classNames';
import RowContext from './RowContext';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
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
        gutter = 0,
        align="top",
        justify="start"
    } = props;

    const [screens, setScreens] = useState({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
    });

    const gutterRef = useRef(gutter);

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

    const prefixCls = usePrefixCls('Row', customizePrefixCls);

    const getGutter = () => {
        const results = [0, 0];
        const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
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

    const gutterValues = getGutter(); 

    return (
       <RowContext.Provider value={{ gutter:gutterValues }}>
            <div className={classNames(
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