import React ,{forwardRef} from 'react';
import classNames from '@packages/utils/classNames'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import PropTypes from 'prop-types'; 
import TabContext from './TabContext';

const TabPaneList=forwardRef((props,ref)=>{

    const { tabs,color }=React.useContext(TabContext);

    const {
        prefixCls:customizePrefixCls,
        className,
        activeKey
    }=props;


    const prefixCls=usePrefixCls('TabPaneList',customizePrefixCls);

    return (
        <div className={classNames(
            `${prefixCls}-Content-Holder`
        )}>
            <div className={classNames(
                `${prefixCls}-Content`
            )}>
                {tabs.map(tab=>{
                    return React.cloneElement(tab.node,{
                        key:tab.key,
                        tabKey:tab.key,
                        active:tab.key===activeKey
                    })
                })}
            </div>

        </div>
    )
    
});


export default TabPaneList;