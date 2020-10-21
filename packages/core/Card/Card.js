import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Paper from '@packages/core/Paper';
import Header from './Header';
import Content from './Content';
import Meta from './Meta';
import childrenToArray from '@packages/utils/childrenToArray';
import "./index.scss";
import Bottom from './Bottom';
import Action from './Action';

 
function isHaveCardElement(children){
    return childrenToArray(children).find((child)=>(child.type===Header||child.type===Content||child.type===Bottom||child.type===Meta||child.type===Action))
}

const Card=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Card",customizePrefixCls); 

    const hasCardElement=isHaveCardElement(children);

    return <Paper
        className={
            classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-notHasCardElement`]:!hasCardElement
                }
            )
        }
        style={style}
        ref={ref}
    >
        {children}
    </Paper>

});

export default Card;