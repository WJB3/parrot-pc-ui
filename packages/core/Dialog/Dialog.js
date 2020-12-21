
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

import "./index.scss";

export const destroyFns=[];

const Dialog=React.forwardRef((props,ref)=>{ 

    const {
        prefixCls:customizePrefixCls,
        width=416,
        bodyStyle,
        bodyClassName,
        icon=<QuestionOutline />,
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
                <div className={`${prefixCls}-Body-Title-Icon`}>{icon}</div>
            </div>
        </Modal>
    )

    
});

export default Dialog;