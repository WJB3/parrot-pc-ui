
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
        ...restProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Dialog",customizePrefixCls);

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
            bodyClassName={classNames(bodyClassName,`${prefixCls}-Body`)}
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
                    <ActionButton color={cancelColor} actionFn={onCancel} closeModal={close} >{cancelText}</ActionButton>
                    <ActionButton color={okColor} actionFn={onOk} closeModal={close}>{okText}</ActionButton>
                </Space>
            </div>
        </Modal>
    )

    
});

export default Dialog;