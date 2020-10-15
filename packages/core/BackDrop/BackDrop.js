import React, { useEffect,useContext  } from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Portal from '@packages/core/Portal';
import { Fade } from '@packages/core/Transition'
import "./index.scss";

const BackDrop=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        visible,
        children,
        target, 
        disabledScroll,
        centered=true,
        ...restProps
    }=props; 

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("BackDrop", customizePrefixCls);

    useEffect(()=>{
        if(disabledScroll && open){
            document.body.style="overflow:hidden";
        }

        return ()=>{
            if(open){
                document.body.style="overflow:auto";
            }
        }
    },[disabledScroll,visible])

    return (
        <Portal target={target}>
            <Fade visible={visible}>
                <div className={classNames(
                    prefixCls,className,{
                        [`${prefixCls}-Centered`]:centered
                    }
                )} {...restProps}>
                    {children}
                </div>
            </Fade>
        </Portal>
    )
});

BackDrop.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any,
    disabledScroll:PropTypes.bool,
    visible:PropTypes.bool,
    target:PropTypes.object,
    onClick:PropTypes.func
};

export default BackDrop;