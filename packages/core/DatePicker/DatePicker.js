
import React, { useContext, Fragment, useState, useRef, useEffect } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import PickerContainer from '@packages/core/PickerContainer';
import useControlled from '@packages/hooks/useControlled';
import useDate, {
    weekEnum,
    chunk,
    getNextMonth,
    getPrevMonth,
    complete,
    chunkInput,
    getPrevYear,
    getNextYear,
    transformMonth,
    generateYear
} from '@packages/utils/useDate';
import Button from '@packages/core/Button';
import useInit from '@packages/hooks/useInit';
import {
    KeyboardArrowLeft,
    KeyboardArrowRight
} from '@packages/core/Icon';
import classNames from '@packages/utils/classNames';
import usePrevState from '@packages/hooks/usePrevState';
import Slider from './Slider';
import "./index.scss";

const DatePicker = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        className,
        value: valueProp,
        defaultValue,
        type: typeProp = "day",//year/month/day
        onChange,
        landspace=false
    } = props;

    const [value, setValue] = useControlled({
        controlled: valueProp,
        default: defaultValue
    });

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("DatePicker", customizePrefixCls);

    //只做展示的value
    const [displayValue, setDisplayValue] = useState(value);

    //展示的类型
    const [displayType, setDisplayType] = useState(typeProp);

    //当前年份
    const currentYearRef = useRef(null);

    //年份
    const yearListRef = useRef(null);

    const isInit=useInit();

    const prevValue = usePrevState(value);
    //一个展示的date 界面渲染跟着他来 
    const prevDisplayValue = usePrevState(displayValue);

    const getStatus = (mode) => {
        //获取动画方向
        if (mode === "value") {
            //如果是value的变化
            if (prevValue) {
                if (useDate(prevValue).time > useDate(value).time) {
                    return "prev";
                }
                return "next";
            }
        } else if (mode === "display") {

            if (prevDisplayValue) {
                if (useDate(prevDisplayValue).time > useDate(displayValue).time) {
                    return "prev";
                }
                return "next";
            }
        }

        return "next";
    }

    const handleSwitchTitle = (status) => {//点击左右侧按钮

        //切换月份
        if (displayType === "day") {

            if (status === "next") {
                setDisplayValue(useDate(getNextMonth(displayValue)).fullDate)
            } else {
                setDisplayValue(useDate(getPrevMonth(displayValue)).fullDate)
            }

        } else if (displayType === "month") {
            if (status === "next") {
                setDisplayValue(useDate(getNextYear(displayValue)).fullDate)
            } else {
                setDisplayValue(useDate(getPrevYear(displayValue)).fullDate)
            }
        }
    }

    const handleClickButton = (num) => {//点击日历上的日期
        if (displayType === "day") {
            setValue(`${useDate(displayValue).year}-${useDate(displayValue).month}-${complete(num)}`);
            setDisplayValue(`${useDate(displayValue).year}-${useDate(displayValue).month}-${complete(num)}`);
        } else if (displayType === "month") {
            setValue(`${useDate(displayValue).year}-${complete(num)}-${useDate(value).day}`);
            setDisplayValue(`${useDate(displayValue).year}-${complete(num)}-${useDate(value).day}`)
            handleSwicthType("day");
        } else if (displayType === "year") {
            setValue(`${num}-${useDate(value).month}-${useDate(value).day}`);
            setDisplayValue(`${num}-${useDate(value).month}-${useDate(value).day}`);
            handleSwicthType("month");
        }

    }
 

    const handleSwicthType=(toMode)=>{//toMode表示切换到哪种模式
        if(typeProp==="day"){//typeProp为day时可以切换到任意模式
            setDisplayType(toMode);
        }else if(typeProp==="month"){//typeProp为month时无法切换到day模式下
            if(toMode==="day"){
                return ;
            }
            setDisplayType(toMode);
        }else if(typeProp==="year"){
            if(toMode==="day"||toMode==="month"){
                return ;
            }
            setDisplayType(toMode);
        }
    }


    //渲染头部内容
    const renderDisplay = () => {

        let displayNode;

        let yearNode = <div className={`${prefixCls}-Display-Year`} onClick={()=>handleSwicthType("year")}>
            <Slider status={getStatus("value")} date={useDate(value).year}>
                <div className={`${prefixCls}-Display-Year-Text`}>
                    {useDate(value).year}
                </div>
            </Slider>
        </div>

        let monthNode = <div className={`${prefixCls}-Display-Month`}>
            <Slider status={getStatus("value")} date={useDate(value).month}>
                <div className={`${prefixCls}-Display-Month-Text`}>
                    {useDate(value).monthTransform}
                </div>
            </Slider>
        </div>


        let monthdayNode = <div className={`${prefixCls}-Display-Monthday`} onClick={()=>handleSwicthType("day")}>
            <Slider status={getStatus("value")} date={useDate(value).fullDate}>
                <div className={`${prefixCls}-Display-Monthday-Text`}>
                    {useDate(value).monthday} {useDate(value).weekTransform}
                </div>
            </Slider>

        </div>

        if (typeProp === "day") {
            displayNode = <Fragment>
                {yearNode}
                {monthdayNode}
            </Fragment>
        } else if (typeProp === "month") {
            displayNode = <Fragment>
                {yearNode}
                {monthNode}
            </Fragment>
        } else if(typeProp==="year"){
            displayNode = <Fragment>
                {yearNode} 
            </Fragment>
        }
        
        

        return displayNode;
    }

    //渲染内容区域
    const renderContainer = () => {
        let containerNode;
        let toolbarNode;
        let toolbarTitle;
        let weekNode;
        let contentNode;

        if (displayType === "day") {

            toolbarTitle = <Slider status={getStatus("display")} date={useDate(displayValue).month} direction="leftRight">
                <div className={`${prefixCls}-Toolbar-Title-Text`} onClick={()=>handleSwicthType("month")}>
                    {useDate(displayValue).yearTransform} {useDate(displayValue).monthTransform}
                </div>
            </Slider>

            weekNode = <div className={`${prefixCls}-Container-Monthday-Week`}>
                {
                    weekEnum.map((week) => <div key={week} className={`${prefixCls}-Container-Monthday-Week-Day`}>{week}</div>)
                }
            </div>

            contentNode = <div className={`${prefixCls}-Container-Monthday-Day`}>
                <Slider status={getStatus("display")} date={useDate(displayValue).month} direction="leftRight" renderChildren>
                    <div className={`${prefixCls}-Container-Monthday-Day-Wrapper`}>
                        {chunk(useDate(displayValue).date, 7).map((item, idx) => {
                            return <div key={idx} className={`${prefixCls}-Container-Monthday-Day-Row`} >
                                {item.map((i, index) => {
                                    if (!i) {
                                        return <div key={index} className={`${prefixCls}-Container-Monthday-Day-Row-Empty`}></div>
                                    }
                                    return <div key={index} className={classNames(
                                        `${prefixCls}-Container-Monthday-Day-Row-Button`,
                                        {
                                            ['now']: useDate(displayValue).year === useDate().year &&
                                                useDate(displayValue).month === useDate().month &&
                                                Number(i) === Number(useDate().day),
                                            ['selected']: useDate(value).year === useDate(displayValue).year &&
                                                useDate(value).month === useDate(displayValue).month &&
                                                Number(i) === Number(useDate(value).day)
                                        }
                                    )} onClick={() => handleClickButton(i)}>
                                        <div className={`${prefixCls}-Container-Monthday-Day-Row-Button-Bg`}></div>
                                        <div className={`${prefixCls}-Container-Monthday-Day-Row-Button-Text`}>{i}</div>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                </Slider>
            </div>
        } else if (displayType === "month") {

            toolbarTitle = <Slider status={getStatus("display")} date={useDate(displayValue).year} direction="leftRight">
                <div className={`${prefixCls}-Toolbar-Title-Text`} onClick={()=>handleSwicthType("year")}>
                    {useDate(displayValue).yearTransform}
                </div>
            </Slider>

            weekNode = null;

            contentNode = <div className={`${prefixCls}-Container-Month-Content`}>
                <Slider status={getStatus("display")} date={useDate(displayValue).year} direction="leftRight" renderChildren>
                    <div className={`${prefixCls}-Container-Month-Button-Wrapper`}>
                        {chunkInput(Array.from({ length: 12 }, (v, k) => k + 1), 3).map((item, idx) => {
                            return <div key={idx} className={`${prefixCls}-Container-Month-Button-Wrapper-Row`} >
                                {item.map((i, index) => {
                                    return <div key={index} className={classNames(
                                        `${prefixCls}-Container-Month-Button`,
                                        {
                                            ['now']: useDate(displayValue).year === useDate().year &&
                                                useDate(displayValue).month == complete(i),
                                            ['selected']: useDate(value).year === useDate(displayValue).year &&
                                                useDate(value).month ==complete(i)
                                        }
                                    )} onClick={() => handleClickButton(i)}>
                                        <div className={`${prefixCls}-Container-Month-Button-Bg`}></div>
                                        <div className={`${prefixCls}-Container-Month-Button-Text`}>{transformMonth(i)}</div>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                </Slider>
            </div>

        }


        toolbarNode = <div className={`${prefixCls}-Toolbar`}>
            <Button centerRipple type="text" shape="circle" className={`${prefixCls}-Container-Monthday-Button`} onClick={() => handleSwitchTitle("prev")}>
                <KeyboardArrowLeft />
            </Button>

            <div className={`${prefixCls}-Toolbar-Title`}>
                {toolbarTitle}
            </div>

            <Button centerRipple type="text" shape="circle" className={`${prefixCls}-Container-Monthday-Button`} onClick={() => handleSwitchTitle("next")}>
                <KeyboardArrowRight />
            </Button>
        </div>

        if (displayType === "year") {
            toolbarNode = null;
            weekNode = null;
            contentNode =  <div className={`${prefixCls}-Container-Year-Wrapper`} ref={yearListRef}>
                <div className={`${prefixCls}-Container-Year-List`} >
                    {
                        generateYear(value).map((item) => {

                            const isCurrent = useDate(value).year === item;

                            return <div ref={isCurrent ? currentYearRef : null}
                                className={classNames(
                                    `${prefixCls}-Container-Year-List-Item`,
                                    {
                                        ['selected']: isCurrent
                                    }
                                )}
                                key={item}
                                onClick={() => handleClickButton(item)}
                            >
                                {item}
                            </div>
                        })
                    }
                </div>
            </div> 
        }



        containerNode = <div className={classNames(
            {
                [`${prefixCls}-Container-Monthday`]: displayType === "day",
                [`${prefixCls}-Container-Month`]: displayType === "month",
                [`${prefixCls}-Container-Year`]: displayType === "year",
            }
        )}>
            {toolbarNode}
            {weekNode}
            {contentNode}
        </div>

        return containerNode;
    }

    useEffect(() => {
        if (displayType === "year") {
            let distance = currentYearRef.current.offsetTop;
            console.log(distance);
            console.log(yearListRef.current.scrollTop);
            console.log(yearListRef.current);

            yearListRef.current.scrollTop = distance - 110;

        }
    }, [displayType, value]);

    useEffect(()=>{
        if(isInit){
            onChange?.(value);
        }
    },[value]);

    return (
        <PickerContainer
            className={
                prefixCls,
                className
            }
            display={
                renderDisplay()
            }
            displayName={classNames(
                `${prefixCls}-Display`,
                {
                    [`${prefixCls}-DisplayMonth`]: displayType === "year",
                    [`${prefixCls}-Display-TypeMonth`]:typeProp==="year"
                }
            )}
            container={
                renderContainer()
            }
            containerName={classNames(
                `${prefixCls}-Container`,
                {
                    [`${prefixCls}-ContainerYear`]: displayType === "year"
                }
            )}
            landspace={landspace}
        />
    )
});

export default DatePicker;

