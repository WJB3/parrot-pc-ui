import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import TabContext from './TabContext';
import capitalize from '@packages/utils/capitalize';
import childrenToArray from '@packages/utils/childrenToArray';
import TabNavBar from './TabNavBar';
import "./index.scss";

function parseTabList(children){
    return childrenToArray(children)
    .map((node)=>{
        if(React.isValidElement(node)){
            const key=node.key!==undefined?String(node.key):undefined;
            return {
                key,
                ...node.props,
                node
            }
        }

        return null;
    })
    .filter(tab=>tab);
}

const Tabs=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className, 
        children,
        tabPosition="top",
        component:Component="div",
        color="primary",
        ...restProps
    }=props;

    const prefixCls=usePrefixCls('Tabs',customizePrefixCls);

    const tabs=parseTabList(children);

    const tabNavBarProps={

    }
 
    return (
        <TabContext.Provider value={{tabs,color}}>
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
            >
                <TabNavBar {...tabNavBarProps} />
            </Component>
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