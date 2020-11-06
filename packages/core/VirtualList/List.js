
import React ,{ useContext,useCallback } from 'react';
import PropTypes from 'prop-types'; 
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import "./index.scss";

//1.当 ref 属性是一个回调函数时，此函数会（根据元素的类型）接收底层 DOM 元素或 class 实例作为其参数。这能够让你直接访问 DOM 元素或组件实例。
//2.slice
//3.useCallback

const List=React.forwardRef((props,ref)=>{

    const {
        height,
        prefixCls:customizePrefixCls,
        data:originData,
        itemKey
    }=props;

    const preficCls=useContext(ConfigContext)?.getPrefixCls("VirtualList",customizePrefixCls);

    const getKey=useCallback((item)=>{
        return item[itemKey];
    },[itemKey]);

    const containerStyle={
        height,
        overflow:"hidden"
    };

    const viewChildren=useChildren(originData,startIndex,endIndex,getKey);

    return <div className={preficCls} style={{position:"relative"}}>

        <div className={`${preficCls}-Container`} style={containerStyle}>
            <div ></div>
        </div>

        <div className={`${prefixCls}-ThumbWrapper`} style={{position:"absolute",width:8,right:0,top:0,bottom:0}}>
            <div className={`${prefixCls}-Thumb`}></div>
        </div>


    </div>
});

List.propTypes = {
    //显示区域的容器高度
    height:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default List;