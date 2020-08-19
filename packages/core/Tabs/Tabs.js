import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import TabContext from './TabContext';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

const Tabs=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className, 
        children,
        tabPosition="top",
        component:Component="div",
        ...restProps
    }=props;

    const prefixCls=usePrefixCls('Tabs',customizePrefixCls);
 
    return (
        <TabContext.Provider >
            <Component
                className={classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-TabPosition${capitalize(tabPosition)}`]:tabPosition
                    }
                )}
                ref={ref} 
                {...restProps}
            />
        </TabContext.Provider> 
    )
});

Tabs.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any,
    tabPosition:PropTypes.oneOf(['top','bottom','left','right']),
    component:PropTypes.string,
    restProps:PropTypes.object
};

export default Tabs;