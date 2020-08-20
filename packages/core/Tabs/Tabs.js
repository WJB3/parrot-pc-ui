import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import useControlled from '@packages/hooks/useControlled';
import TabContext from './TabContext';
import capitalize from '@packages/utils/capitalize';
import childrenToArray from '@packages/utils/childrenToArray';
import TabNavBar from './TabNavBar';
import "./index.scss";

function parseTabList(children){
    return childrenToArray(children)
    .map((node)=>{
        if(React.isValidElement(node)){
            const key=(node.key!==undefined&&node.key!==null)?String(node.key):undefined;
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

    const { children }=props;

    const tabs=parseTabList(children);

    console.log(tabs)

    const {
        prefixCls:customizePrefixCls,
        className,  
        tabPosition="top",
        component:Component="div",
        color="primary",
        activeKey:activeKeyProp,
        defaultActiveKey=tabs[0]?.key,
        onTabClick,
        onChange,
        ...restProps
    }=props;

    const prefixCls=usePrefixCls('Tabs',customizePrefixCls);

    const [activeKey,setActiveKey,isKeyControlled]=useControlled({controlled:activeKeyProp,default:defaultActiveKey});

    console.log(isKeyControlled)

    const onInternalTabClick=(key,e)=>{

        onTabClick?.(key,e);
        setActiveKey(key);
        if(activeKey!==key){
            onChange?.(key);
        }
    }

    const tabNavBarProps={
        activeKey,
        onTabClick:onInternalTabClick
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