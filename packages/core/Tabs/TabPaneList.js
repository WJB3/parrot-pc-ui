import React ,{forwardRef} from 'react';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import TabContext from './TabContext';
import "./index.scss";

const TabPaneList=forwardRef(function(props,ref){

    const { tabs,color }=React.useContext(TabContext);

    const {
        prefixCls:customizePrefixCls,
        className,
        activeKey
    }=props;

    const prefixCls=usePrefixCls('TabPaneList',customizePrefixCls);

    return (
        <div className={classNames(
            `${prefixCls}-Content`,className
        )}>
            <div className={classNames(
                `${prefixCls}-Content-ListWrap`
            )}>
                {tabs.map(tab=>{
                    return React.cloneElement(tab.node,{
                        key:tab.key,
                        tabKey:tab.key,
                        active:tab.key===activeKey,
                        prefixCls:prefixCls
                    })
                })}
            </div>

        </div>
    )
    
});

TabPaneList.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string,
    activeKey:PropTypes.string
}

export default TabPaneList;