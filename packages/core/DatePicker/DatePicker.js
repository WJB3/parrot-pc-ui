
import React,{useContext,Fragment,useState} from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import PickerContainer from '@packages/core/PickerContainer';
import useControlled from '@packages/hooks/useControlled';
import useDate,{weekEnum,chunk} from '@packages/utils/useDate';
import Button from '@packages/core/Button';
import {
    KeyboardArrowLeft,
    KeyboardArrowRight
} from '@packages/core/Icon';
import classNames from '@packages/utils/classNames';
import usePrevState from '@packages/hooks/usePrevState';
import "./index.scss";

const DatePicker=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        value:valueProp,
        defaultValue,
        type:typeProp="day",//year/month/day
    }=props;

    const [value,setValue]=useControlled({
        controlled:valueProp,
        default:defaultValue
    });

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("DatePicker",customizePrefixCls);

    //只做展示的value
    const [displayValue,setDisplayValue]=useState(value);

    //展示的类型
    const [displayType,setDisplayType]=useState(typeProp);

    //一个值的date 不会轻易改变除非setValue
    const valueDate=useDate(value);
    const prevValueDate=usePrevState(valueDate);
    //一个展示的date 界面渲染跟着他来
    const displayDate=useDate(displayValue); 
    const prevDisplayDate=usePrevState(displayDate);

    const getDirection = (mode) => { 

        if(mode==="value"){
            //如果是value的变化
            if (prevValueDate) {
                if (prevValueDate.time > valueDate.time) {
                    return "prev";
                }
                return "next";
            }
        }else if(mode==="display"){
            if(prevDisplayDate){
                if(prevDisplayDate.time>displayDate.time){
                    return "prev";
                }
                return "next";
            }
        }

        return "next";
    }

    const renderDisplay=()=>{

        let displayNode;

        let yearNode=<div className={`${prefixCls}-Display-Year`}>
            {valueDate.year}
        </div>

        let monthNode=<div className={`${prefixCls}-Display-Month`}>
            {valueDate.month}
        </div>

        let monthdayNode=<div className={`${prefixCls}-Display-Monthday`}>
            {valueDate.monthday} {valueDate.weekTransform}
        </div>

        if(typeProp==="day"){
            displayNode=<Fragment>
                {yearNode}
                {monthdayNode}
            </Fragment>
        }

        return displayNode;
    }
    
    const renderContainer=()=>{ 
 
        let containerNode;

        if(displayType==="day"){
            containerNode=<div className={`${prefixCls}-Container-Monthday`}>
                <div className={`${prefixCls}-Toolbar`}>
                    <Button type="text" shape="circle" className={`${prefixCls}-Container-Monthday-Button`}>
                        <KeyboardArrowLeft />
                    </Button>
                    <div className={`${prefixCls}-Toolbar-Title`}>
                        {displayDate.yearTransform} {displayDate.monthTransform}
                    </div>
                    <Button type="text" shape="circle" className={`${prefixCls}-Container-Monthday-Button`}>
                        <KeyboardArrowRight />
                    </Button>
                </div>
                <div className={`${prefixCls}-Container-Monthday-Week`}>
                    {
                        weekEnum.map((week)=><div key={week} className={`${prefixCls}-Container-Monthday-Week-Day`}>{week}</div>)
                    }
                </div>
                <div className={`${prefixCls}-Container-Monthday-Day`}>
                    {chunk(displayDate?.date,7).map((item,idx)=>{
                        return <div key={idx} className={`${prefixCls}-Container-Monthday-Day-Row`} >
                            {item.map((i,index)=>{
                                if(!i){
                                    return <div key={index} className={`${prefixCls}-Container-Monthday-Day-Row-Empty`}></div>
                                }
                                return <div key={index}  className={classNames(`${prefixCls}-Container-Monthday-Day-Row-Button`)}>
                                    <div className={`${prefixCls}-Container-Monthday-Day-Row-Button-Bg`}></div> 
                                    <div className={`${prefixCls}-Container-Monthday-Day-Row-Button-Text`}>{i}</div> 
                                </div>
                            })}
                        </div>   
                    })}
                </div>
            </div>
        }

        return containerNode;
    }

    return (
        <PickerContainer 
            className={
                prefixCls,
                className
            }
            display={
                renderDisplay()
            }
            displayName={`${prefixCls}-Display`}
            container={
                renderContainer()
            }
            containerName={`${prefixCls}-Container`}
        />
    ) 
});

export default DatePicker;

