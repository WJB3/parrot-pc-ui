
import React, { useContext, useState, useEffect } from 'react';
import BackDrop from '@packages/core/BackDrop';
import Paper from '@packages/core/Paper';
import { ConfigContext } from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import Title from './Title';
import Footer from './Footer';
import Content from './Content';
import {
    CloseOutline
} from '@packages/core/Icon';
import "./index.scss";
import useInit from '@packages/hooks/useInit';

function noop() { }

const Modal = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        //宽度
        width = 600,
        //对话框是否可见
        visible = false,
        //标题
        title,
        children,
        //是否显示右上角的关闭按钮
        closable = true,
        //自定义关闭图标
        closeIcon = CloseOutline,
        //点击蒙层是否允许关闭
        maskClosable = true,
        //是否展示遮罩
        mask = true,
        //点击遮罩层或右上角叉或取消按钮的回调
        onCancel = noop,
        //垂直居中展示 Modal
        centered,
        //是否支持键盘 esc 关闭
        keyboard = true,
        //Modal 完全关闭后的回调
        afterClose = noop,
        //	Modal body 样式
        bodyStyle,
        //关闭时销毁 Modal 里的子元素
        destroyOnClose = false,
        //底部内容，当不需要默认底部按钮时，可以设为 footer={null}
        footer = true,
        //cancel 按钮 props
        cancelButtonProps,
        //取消按钮文字
        cancelText,
        //	确定按钮 loading
        confirmLoading,
        //	指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom
        getContainer,
        //	遮罩样式
        maskStyle,
        modalRender,
        //ok 按钮 props
        okButtonProps,
        //	确认按钮文字
        okText,
        //确认按钮类型
        okColor,
        style,
        zIndex,
        //点击确定回调
        onOk,
        //bodyclassName
        bodyClassName,
        className,
        transitionComponent,
        ...restProps
    } = props;

    const modalStyle = {
        width,
        ...style
    }

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Modal", customizePrefixCls);

    React.useEffect(() => {
        if (visible) {
            setModalVisible(true);
        }
    }, [visible]);


    //使用modalVisible来决定初始化时是否渲染
    const [modalVisible, setModalVisible] = useState(visible);

    const [isMounting, setIsMounting] = useState(true);


    useEffect(() => {
        //如果没有且销毁元素
        if (!visible && destroyOnClose && modalVisible) {
            setIsMounting(false)
        } else if (visible && destroyOnClose && modalVisible) {
            setIsMounting(true)
        }
    }, [visible, destroyOnClose, modalVisible]);

    if (!modalVisible) {
        //初始化时不渲染节点
        return null;
    }

    const handleClose = (isClose) => (e) => {
        if (isClose) {
            onCancel?.(e)
        }
    }

    const modalNode = (
        <BackDrop
            visible={visible}
            ref={ref}
            onClickAway={handleClose(maskClosable)}
            centered={centered}
            transparent={!mask}
            keyboard={keyboard}
            onTransitionExited={afterClose}
            target={typeof getContainer === "function" ? getContainer() : getContainer}
            maskStyle={maskStyle}
            zIndex={zIndex}
            transitionComponent={transitionComponent}
        >
            <Paper
                className={classNames(prefixCls, className,{ [`NoCentered`]: !centered })}
                style={modalStyle}
            >
                {title && <Title prefixCls={prefixCls} closable={closable} closeIcon={closeIcon} onCancel={handleClose(true)}>{title}</Title>}
                <Content
                    prefixCls={prefixCls}
                    bodyClassName={bodyClassName}
                    style={bodyStyle}
                >
                    {isMounting && children}
                </Content>
                {footer && <Footer
                    prefixCls={prefixCls}
                    cancelButtonProps={cancelButtonProps}
                    okButtonProps={okButtonProps}
                    cancelText={cancelText}
                    onCancel={handleClose(true)}
                    confirmLoading={confirmLoading}
                    okText={okText}
                    okColor={okColor}
                    onOk={onOk}
                />}
            </Paper>
        </BackDrop>
    )

    return modalRender ? modalRender(modalNode) : modalNode;
});

export default Modal;

