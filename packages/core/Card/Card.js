import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Paper from '@packages/core/Paper';
import Title from './Title';
import Content from './Content';
import childrenToArray from '@packages/utils/childrenToArray';
import "./index.scss";
import Bottom from './Bottom';

function isHaveCardElement(children){
    childrenToArray(children).find((child)=>(child===<Title />||child===<Content />||child===<Bottom />))
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