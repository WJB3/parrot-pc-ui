
import React, { useContext, Fragment, useState } from 'react';
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
    transformMonth 
} from '@packages/utils/useDate';
import Button from '@packages/core/Button';
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

    const handleSwitchMonth = (status) => {//点击左右侧按钮
        //切换月份
        if (status === "next") {
            setDisplayValue(useDate(getNextMonth(displayValue)).fullDate)
        } else if (status === "prev") {
            setDisplayValue(useDate(getPrevMonth(displayValue)).fullDate)
        }
    }

    const handleClickMonthDay = (day) => {//点击日历上的日期
        setValue(`${useDate(displayValue).year}-${useDate(displayValue).month}-${complete(day)}`)
    }


    //渲染头部内容
    const renderDisplay = () => {

        let displayNode;

        let yearNode = <div className={`${prefixCls}-Display-Year`}>
            <Slider status={getStatus("value")} date={useDate(value).year}>
                <div className={`${prefixCls}-Display-Year-Text`}>
                    {useDate(value).year}
                </div>
            </Slider>
        </div>

        let monthNode = <div className={`${prefixCls}-Display-Month`}>
            {useDate(value).month}
        </div>

        let monthdayNode = <div className={`${prefixCls}-Display-Monthday`}>
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
                <div className={`${prefixCls}-Toolbar-Title-Text`}>
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
                                    )} onClick={() => handleClickMonthDay(i)}>
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
                <div className={`${prefixCls}-Toolbar-Title-Text`}>
                    {useDate(displayValue).yearTransform}
                </div>
            </Slider>

            weekNode = null;

            contentNode = <div className={`${prefixCls}-Container-Month-Content`}>
                <Slider status={getStatus("display")} date={useDate(displayValue).month} direction="leftRight" renderChildren>
                    <div className={`${prefixCls}-Container-Month-Button-Wrapper`}>
                        {chunkInput(Array.from({length:12}, (v,k) => k+1),3).map((item, idx) => {
                            return <div key={idx} className={`${prefixCls}-Container-Month-Button-Wrapper-Row`} >
                                {item.map((i, index) => { 
                                    return <div key={index} className={classNames(
                                        `${prefixCls}-Container-Month-Button`, 
                                    )} onClick={() => handleClickMonthDay(i)}>
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
            <Button centerRipple type="text" shape="circle" className={`${prefixCls}-Container-Monthday-Button`} onClick={() => handleSwitchMonth("prev")}>
                <KeyboardArrowLeft />
            </Button>

            <div className={`${prefixCls}-Toolbar-Title`}>
                {toolbarTitle}
            </div>

            <Button centerRipple type="text" shape="circle" className={`${prefixCls}-Container-Monthday-Button`} onClick={() => handleSwitchMonth("next")}>
                <KeyboardArrowRight />
            </Button>
        </div>

        containerNode = <div className={classNames(
            {
                [`${prefixCls}-Container-Monthday`]: displayType === "day",
                [`${prefixCls}-Container-Month`]: displayType === "month",
            }
        )}>
            {toolbarNode}
            {weekNode}
            {contentNode}
        </div>

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

