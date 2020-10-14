import React , { useContext,useState  } from 'react';
import Popover from '@packages/core/Popover';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext, 
} from '@packages/core/ConfigProvider'; 
import Button from '@packages/core/Button';
import { Warning } from '@packages/core/Icon';
import "./index.scss";

const Popconfirm=React.forwardRef(function(props,ref){

    const {
        children,
        prefixCls:customizePrefixCls,
        className,
        icon,
        title="确认进行此操作吗？",
        cancelText="取消",
        okText="确定",
        okType="primary",
        okButtonProps,
        cancelButtonProps,
        onConfirm=()=>{},
        onCancel=()=>{}
    }=props;

    const [okRef,setOkRef]=useState(null);
    const [cancelRef,setCancekRef]=useState(null);

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Popconfirm",customizePrefixCls); 

    const renderContent=()=>{
        return <div className={classNames(`${prefixCls}-Content`)}>
            <div className={classNames(`${prefixCls}-Message`)}>
                {icon||<Warning   className={classNames(`${prefixCls}-Message-Icon`)}/>}
                <div className={classNames(`${prefixCls}-Message-Title`)}>{title}</div>
            </div>
            <div className={classNames(`${prefixCls}-Button`)}>
                <Button color={okType} size="small" style={{marginRight:6}} {...okButtonProps} ref={setOkRef} onClick={onConfirm}>{okText}</Button>
                <Button color="danger" size="small" {...cancelButtonProps} ref={setCancekRef} onClick={onCancel}>{cancelText}</Button>
            </div>
        </div>
    } 
    
    return (
        <Popover 
            className={
                classNames(
                    prefixCls,
                    className
                )
            }
            content={renderContent()}
            trigger="click"
            externalNode={[okRef,cancelRef]}
        >
            {children}
        </Popover>
    )
});

Popconfirm.propTypes={
    //自定义后缀
    prefixCls:PropTypes.string,
    //自定义类名
    className:PropTypes.string, 
    
};

export default Popconfirm;