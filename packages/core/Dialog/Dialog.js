
import React ,{useContext} from 'react';
import { 
    ConfigContext
}  from '@packages/core/ConfigProvider';
import Modal from '@packages/core/Modal';
import classNames from '@packages/utils/classNames';
import { Slide } from '@packages/core/Transition';
import {
    QuestionOutline
} from '@packages/core/Icon';
import ActionButton from './ActionButton';
import Space from "@packages/core/Space";

import "./index.scss";
import { capitalize } from '@material-ui/core';

export const destroyFns=[];

const Dialog=React.forwardRef((props,ref)=>{ 

    const {
        prefixCls:customizePrefixCls,
        width,
        bodyStyle,
        bodyClassName,
        title,
        content,
        icon=<QuestionOutline />,
        cancelText="取消",
        okText="确定",
        cancelColor="danger",
        okColor="primary",
        onCancel,
        onOk,
        close,
        type="",
        color,
        ...restProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Dialog",customizePrefixCls);

    const isShowCancel=type!=="warning"&&type!=="error"&&type!=="success"&&type!=="info";

    return (
        <Modal 
            {...restProps} 
            centered
            title={null} 
            footer={null}
            width={width}
            className={prefixCls}
            ref={ref} 
            bodyStyle={bodyStyle}
            transitionComponent={Slide}
            bodyClassName={classNames(bodyClassName,`${prefixCls}-Body`,{[`${prefixCls}-Body-${capitalize(type)}`]:type})}
               
        >
            <div className={`${prefixCls}-Body-Title`}>
                <span className={`${prefixCls}-Body-Title-Icon`}>{icon}</span>
                <span className={`${prefixCls}-Body-Title-Title`}>{title}</span>
            </div>
            <div className={`${prefixCls}-Body-Content`}>
                {content}
            </div>
            <div className={`${prefixCls}-Body-Footer`}>
                <Space>
                    {isShowCancel && <ActionButton color={cancelColor} actionFn={onCancel} closeModal={close} >{cancelText}</ActionButton>}
                    <ActionButton color={isShowCancel?okColor:color} actionFn={onOk} closeModal={close}>{isShowCancel?okText:"知道了"}</ActionButton>
                </Space>
            </div>
        </Modal>
    )

    
});

export default Dialog;