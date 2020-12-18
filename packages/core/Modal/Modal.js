
import React ,{ useContext,useState  } from 'react'; 
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

function noop(){}

const Modal=React.forwardRef((props,ref)=>{ 
    const {
        prefixCls:customizePrefixCls,
        //宽度
        width=520,
        //对话框是否可见
        visible=false,
        //标题
        title,
        children,
        //是否显示右上角的关闭按钮
        closable=true,
        //自定义关闭图标
        closeIcon=CloseOutline,
        //点击蒙层是否允许关闭
        maskClosable=true,
        //点击遮罩层或右上角叉或取消按钮的回调
        onCancel=noop
    }=props; 

    const modalStyle={
        width
    }

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Modal",customizePrefixCls);

    React.useEffect(()=>{
        if(visible){
            setModalVisible(true);
        }
    },[visible]);


    //使用modalVisible来决定初始化时是否渲染
    const [modalVisible,setModalVisible]=useState(visible);

    if(!modalVisible){
        //初始化时不渲染节点
        return null;
    }

    const handleClose=()=>()=>{
        
    }
 
    return (
        <BackDrop visible={visible}  ref={ref}>
            <Paper
                className={classNames(prefixCls)}
                style={modalStyle}
            >
                {title && <Title prefixCls={prefixCls} closable={closable} closeIcon={closeIcon} onCancel={}>{title}</Title>}
                <Content
                    prefixCls={prefixCls}
                >
                    {children}
                </Content>
            </Paper>
        </BackDrop>
    )
});

export default Modal;

