
import React ,{ useContext, useEffect,useState  } from 'react';
import Paper from '@packages/core/Paper';
import BackDrop from '@packages/core/BackDrop';
import { ConfigContext } from '@packages/core/ConfigProvider';
import { 
    Slide
} from '@packages/core/Transition';
import "./index.scss";
import capitalize from '@packages/utils/capitalize';
import classNames from '@packages/utils/classNames';
import Title from './Title';
import Footer from './Footer';
import Content from './Content';
import {
    KeyboardArrowRight,
    KeyboardArrowLeft,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from '@packages/core/Icon';
import useInit from '@packages/hooks/useInit';


const Drawer=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        className,
        direction="left",
        visible,
        maskClosable=true,
        //点击遮罩层或右上角叉或取消按钮的回调
        onClose,
        destroyOnClose = false,
        title,
        closable=false,
        closeIcon, 
        bodyClassName,
        bodyStyle,
        children,
        footer=null,
        afterVisibleChange
    }=props;    

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Drawer",customizePrefixCls);

    const [ domRender,setDomRender ]=useState(false);

    const [isMounting, setIsMounting] = useState(true);

    const isInit=useInit();

    useEffect(()=>{
        if(visible){
            setDomRender(true);
        } 
    },[visible]);

    useEffect(() => {
        //如果没有且销毁元素
        if (!visible && destroyOnClose && domRender) {
            setIsMounting(false)
        } else if (visible && destroyOnClose && domRender) {
            setIsMounting(true)
        }
    }, [visible, destroyOnClose, domRender]);

    if(!domRender){
        return null;
    }   
    
    const handleClose = (isClose) => (e) => { 
        if (isClose) {
            onClose?.(e)
        }
    } 
    
    const renderCloseIcon=()=>{
        let icon;
        switch(direction){
            case "left":
                icon=<KeyboardArrowRight />;
                break;
            case "right":
                icon=<KeyboardArrowLeft />;
                break;
            case "down":
                icon=<KeyboardArrowUp />;
                break;
            case "up":
                icon=<KeyboardArrowDown />;
                break;
            default :
                icon=<KeyboardArrowRight />
        } 
        return icon;
    }

    const handleTransitionVisible=(visible)=>(e)=>{
        afterVisibleChange?.(visible,e)
    }
  
    return (
        <BackDrop 
            visible={visible}
            transitionComponent={Slide}
            transitionComponentProp={{direction:direction}}
            onTransitionExited={handleTransitionVisible(false)}
            onTransitionEntered={handleTransitionVisible(true)}
            onClickAway={handleClose(maskClosable)}
            className={`${prefixCls}-BackDrop`}
            drawer
            ref={ref}
        >
            <Paper
                className={
                    classNames(
                        prefixCls,
                        className,
                        { 
                            [`${prefixCls}-${capitalize(direction)}`]:direction
                        }
                    )
                }
                square
            >
                {title && <Title prefixCls={prefixCls} closable={closable} closeIcon={closeIcon||renderCloseIcon} onCancel={handleClose(true)}>{title}</Title>}
                <Content
                    prefixCls={prefixCls}
                    bodyClassName={bodyClassName}
                    style={bodyStyle}
                >
                    {isMounting && children}
                </Content>
                {footer && <Footer prefixCls={prefixCls}>{footer}</Footer>}
            </Paper>
        </BackDrop>
    )
});

export default Drawer;