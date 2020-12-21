import React, { useEffect, useContext, useState ,useRef} from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Portal from '@packages/core/Portal';
// import Slide from '@material-ui/core/Slide';
import { Fade,Slide } from '@packages/core/Transition';
import ClickAwayListener from '@packages/core/ClickAwayListener';
import Mask from './Mask';
import "./index.scss";
import KeyCode from '@packages/utils/KeyCode';

function noop() { }

const BackDrop = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        visible,
        children,
        target,
        disabledScroll,
        centered = false,
        transitionComponent: TransitionComponent = Fade,
        onClickAway = noop,
        //背景色是否透明
        transparent=false,
        keyboard,
        onModalExited,
        maskStyle,
        zIndex="auto",
        ...restProps
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("BackDrop", customizePrefixCls);

    const [stopListen, setStopListen] = useState(true);

    const modalRef=useRef(null);

    const [appear,setAppear]=useState(false);

    const handleKeyDown=(e)=>{
        if(keyboard && e.keyCode===KeyCode.ESC){
            onClickAway?.(e);
        }
    }

    useEffect(() => {
        if (disabledScroll && visible) {
            document.body.style = "overflow:hidden";
        }   
        if(visible && modalRef.current){ 
            modalRef.current?.focus();
        }
        if(!visible){
            modalRef.current?.blur();
        }
        return () => {
            if (visible) {
                document.body.style = "overflow:auto";
            }
        }
    }, [disabledScroll, visible,modalRef.current]);  
 
    let centerStyle={}

    if(centered){
        centerStyle={
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }
    }
    const divStyle={
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...centerStyle
    }

    const handleExited=(e)=>{
        setStopListen(true);
        setAppear(false);
        onModalExited?.(e);
    }

    return (
        <Portal target={target} ref={ref}>
            <div style={{...divStyle,zIndex:appear?zIndex:-1}}>
            <Fade visible={visible} unmountOnExit  >
                <Mask prefixCls={prefixCls} transparent={transparent} maskStyle={maskStyle} />
            </Fade>
            
            <TransitionComponent  visible={visible} onEnter={()=>setAppear(true)} onEntered={() => setStopListen(false)} onExited={handleExited} >

                <div   
                    className={classNames(
                        prefixCls, className, {
                        [`${prefixCls}-Centered`]: centered,
                    })} 
                    {...restProps}
                >
                    <ClickAwayListener onClickAway={onClickAway} stopListen={stopListen} ref={modalRef}>
                        {React.cloneElement(children,{
                            tabIndex:-1,
                            onKeyDown:handleKeyDown
                        })}
                    </ClickAwayListener>
                </div>

            </TransitionComponent>
            </div>
        </Portal>
    )
});

BackDrop.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    disabledScroll: PropTypes.bool,
    visible: PropTypes.bool,
    target: PropTypes.object,
    onClick: PropTypes.func
};

export default BackDrop;