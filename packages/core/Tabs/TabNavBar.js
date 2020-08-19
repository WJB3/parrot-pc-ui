import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import TabContext from './TabContext';
import capitalize from '@packages/utils/capitalize'; 
import ButtonBase from '@packages/core/ButtonBase';
import "./index.scss";

const TabNavBar=React.forwardRef((props,ref)=>{

    const { tabs,color }=React.useContext(TabContext);

    const {
        prefixCls:customizePrefixCls,
        className, 
        children,
        tabPosition="top",
        component:Component="div",
        ...restProps
    }=props;

    const prefixCls=usePrefixCls('TabNavBar',customizePrefixCls);
    const prefixClsTab=usePrefixCls('Tab',customizePrefixCls);

    const tabNavBarProps={

    }

    const tabNodes=tabs.map(tab=>{

        const { key,tab }=tab;

        <ButtonBase className={classNames(
            prefixClsTab,
            {
                [`${prefixClsTab}-Color${capitalize(color)}`]:color
            }
        )}>
            {tab}
        </ButtonBase>
    })
 
    return ( 
            <Component
                className={classNames(
                    prefixCls,
                    className
                )}
                ref={ref} 
                {...restProps}
            >
                <div
                    className={
                        classNames(
                            `${prefixCls}-Wrap`
                        )
                    }
                ></div>
                {tabNodes}
            </Component> 
    )
});

TabNavBar.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any,
    tabPosition:PropTypes.oneOf(['top','bottom','left','right']),
    component:PropTypes.string,
    restProps:PropTypes.object
};

export default TabNavBar;