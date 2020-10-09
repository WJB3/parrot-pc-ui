import React,{useContext } from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types';  
import childrenToArray from '@packages/utils/childrenToArray';
import capitalize from '@packages/utils/capitalize';
import {
    ConfigContext,
} from '@packages/core/ConfigProvider';  
import "./index.scss"; 

const spaceSize = {
    small: 8,
    default: 16,
    large: 24,
};

const Space=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className, 
        children,
        component:Component='div',
        direction="horizontal", 
        itemStyle,
        size="default"
    }=props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Space", customizePrefixCls);

    const items=childrenToArray(children);

    return (
        <Component ref={ref} className={classNames(
            prefixCls,className,
            direction?`${prefixCls}-${capitalize(direction)}`:`${prefixCls}-Horizontal`,
        )}>
            {
                items.map((child,i)=>(
                    <div 
                        className={`${prefixCls}-Item`}
                        key={`${prefixCls}-Item-${i}`}
                        style={
                            i === items.length - 1
                              ? {...itemStyle}
                              : {
                                  [direction === 'vertical' ? 'marginBottom' : 'marginRight']:
                                    typeof size === 'string' ? spaceSize[size] : size,
                                    ...itemStyle
                                }
                        }
                        
                    >
                        {child}     
                    </div>
                ))
            }
        </Component>
    )
});

Space.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any, 
    direction:PropTypes.string,
    size:PropTypes.oneOf(['small','default','large']),
    itemStyle:PropTypes.object,
    component:PropTypes.string
};

export default Space;