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
import zIndex from '@material-ui/core/styles/zIndex';

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
        transitionComponent: TransitionComponent = Slide,
        onClickAway = noop,
        //背景色是否透明
        transparent=false,
        ...restProps
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("BackDrop", customizePrefixCls);

    const [stopListen, setStopListen] = useState(true);

    const modalRef=useRef(null);

    const [appear,setAppear]=useState(false);

    useEffect(() => {
        if (disabledScroll && visible) {
            document.body.style = "overflow:hidden";
        }   
        if(visible && modalRef.current){
            console.log("a")
            console.log(modalRef.current)
            modalRef.current?.focus();
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

    return (
        <Portal target={target} ref={ref}>
            <div style={{...divStyle,zIndex:appear?"auto":-1}}>
            <Fade visible={visible} unmountOnExit  >
                <Mask prefixCls={prefixCls} transparent={transparent} />
            </Fade>
            
            <TransitionComponent  visible={visible} onEnter={()=>setAppear(true)} onEntered={() => setStopListen(false)} onExited={() => {setStopListen(true);setAppear(false);}} >

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
                            onKeyDown:()=>{console.log("onKeyDown")}
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