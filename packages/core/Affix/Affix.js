import React, { useRef, useState, useEffect } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import ResizeObserver from '@packages/core/ResizeObserver';
import usePrevState from '@packages/hooks/usePrevState';
import useInit from '@packages/hooks/useInit';
import { 
    addObserveTarget, 
    removeObserveTarget,
    getTargetRect, 
    getFixedTop,
    getFixedBottom 
} from '@packages/utils/affixUtils';
import { deepCompare } from '@packages/utils/objectUtils';

import "./index.scss";

function getDefaultTarget(target) {
    if (target) {
        return typeof target === 'function' ? target() : target;
    }
    return typeof window !== 'undefined' ? window : null;
}

const AffixStatus = {
    None: "None",
    Prepare: "Prepare"
}

const Affix = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        children,
        style,
        target,
        offsetBottom,
        offsetTop,
        onChange
    } = props;

    const prefixCls = usePrefixCls('Affix', customizePrefixCls);
    const [affixStyle, setAffixStyle] = useState(undefined);
    const [placeholderStyle, setPlaceholderStyle] = useState(undefined);
    const prevAffixStyle = usePrevState(affixStyle);
    const [status, setStatus] = useState(AffixStatus.None); 

    const targetNode = getDefaultTarget(target);
    const isInit = useInit();
 
    const placeholderRef = useRef(null);
    const fixedRef = useRef(null);
    let timeoutRef=useRef(null);
 
    useEffect(()=>{
        timeoutRef = setTimeout(() => {
            addObserveTarget(targetNode, {
                updatePosition 
            }); 
        });
    },[])

    const getOffsetTop = () => {
        if (offsetBottom === undefined && offsetTop === undefined) {
            offsetTop = 0;
        }
        return offsetTop;
    } 

    const updatePosition = () => {  
        setStatus(AffixStatus.Prepare);
        setAffixStyle(undefined);
        setPlaceholderStyle(undefined);
    }

    const measure = () => { 

        if (status !== AffixStatus.Prepare || !fixedRef.current || !placeholderRef.current || !targetNode) {
            return;
        }
 
        const offsetTop = getOffsetTop();
        const targetRect = getTargetRect(targetNode);
        const placeholderReact = getTargetRect(placeholderRef.current);

        console.log(placeholderReact);
   
        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

        setStatus(AffixStatus.None);  

        if (fixedTop !== undefined) {
            setAffixStyle({
                position: "fixed",
                top: fixedTop,
                width: placeholderReact.width,
                height: placeholderReact.height
            })
            setPlaceholderStyle({
                width: placeholderReact.width,
                height: placeholderReact.height
            })
        } else if (fixedBottom !== undefined) {
            setAffixStyle({
                position: "fixed",
                bottom: fixedBottom,
                width: placeholderReact.width,
                height: placeholderReact.height
            })
            setPlaceholderStyle({
                width: placeholderReact.width,
                height: placeholderReact.height
            })
        }
    }
 
    useEffect(() => { 
        measure();
    }, [status]); 

    useEffect(() => { 
        //固定状态改变时触发的回调函数
        if (deepCompare(prevAffixStyle, affixStyle) && isInit) {
            onChange?.(!!affixStyle);
        }
    }, [affixStyle]) 

    return (
        <ResizeObserver
            onResize={() => {
                updatePosition();
            }}
        >
            <div style={style} ref={placeholderRef}>

                {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}

                <div className={classNames({
                    [prefixCls]: affixStyle
                })} ref={fixedRef} style={affixStyle}>
                    {children}
                </div>
            </div>
        </ResizeObserver>
    )
});

Affix.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    offsetBottom: PropTypes.number,
    offsetTop: PropTypes.number,
    offsetLeft: PropTypes.number,
    offsetRight: PropTypes.number
};

export default Affix;