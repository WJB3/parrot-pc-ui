import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import useControlled from '@packages/hooks/useControlled';
import TabContext from './TabContext';
import capitalize from '@packages/utils/capitalize';
import childrenToArray from '@packages/utils/childrenToArray';
import TabNavBar from './TabNavBar';
import TabPaneList from './TabPaneList';
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

const Tabs=React.forwardRef(function(props,ref){

    const { children }=props;

    const tabs=parseTabList(children); 
    
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
        tabBarShadow,
        tabBarStyle,
        type="line",
        isEdit=false,
        onEdit,
        centered,
        ...restProps
    }=props;

    const prefixCls=usePrefixCls('Tabs',customizePrefixCls);

    const [activeKey,setActiveKey]=useControlled({controlled:activeKeyProp,default:defaultActiveKey});

    const onInternalTabClick=(key,e)=>{
        onTabClick?.(key,e);
        setActiveKey(key);
        if(activeKey!==key){
            onChange?.(key);
        }
    }

    const shareProps={
        activeKey
    }

    const tabNavBarProps={
        ...shareProps,
        shadow:tabBarShadow,
        style:tabBarStyle,
        isCard:type==="card",
        isEdit:isEdit,
        centered:centered,
        onEdit:onEdit,
        onTabClick:onInternalTabClick
    }
    
    const tanPaneListProps={
        ...shareProps,
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
                <TabPaneList {...tanPaneListProps} />
            </Component>
        </TabContext.Provider> 
    )
});

Tabs.propTypes={
    //类名前缀
    prefixCls:PropTypes.string,
    //额外类名
    className:PropTypes.string, 
    //孩子节点
    children:PropTypes.any,
    //tabbar的位置
    tabPosition:PropTypes.oneOf(['top','bottom','left','right']),
    //tabbar包裹组件
    component:PropTypes.string,
    //额外的属性
    restProps:PropTypes.object,
    //激活的key
    activeKey:PropTypes.string,
    //默认的激活key
    defaultActiveKey:PropTypes.string,
    //单个tab的点击
    onTabClick:PropTypes.func,
    //tab切换时变化
    onChange:PropTypes.func,
    //tabbar的shadow程度
    tabBarShadow:PropTypes.number,
    //tabbar的style样式
    tabBarStyle:PropTypes.object,
    //tab的type
    type:PropTypes.oneOf(['line','card']),
    //是否可以编辑
    isEdit:PropTypes.bool,
    //是否隐藏增加按钮
    hideAdd:PropTypes.bool
};

export default Tabs;