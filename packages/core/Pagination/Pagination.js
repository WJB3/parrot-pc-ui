
import React, { useContext, useMemo, useState, useRef, useEffect } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import Button from '@packages/core/Button';
import useControlled from '@packages/hooks/useControlled';
import {
    KeyboardArrowLeft, KeyboardArrowRight, MoreHorizontal, ArrowDoubleLeft, ArrowDoubleRight
} from '@packages/core/Icon';
import capitalize from '@packages/utils/capitalize';
import Select from '@packages/core/Select'; 
import InputNumber from '@packages/core/InputNumber';
import "./index.scss";

const Pagination = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        current: currentProp,
        defaultCurrent = 1,
        pageSize: pageSizeProp,
        defaultPageSize = 10,
        maxPageNum = 7,
        total,
        color,
        size,
        jumpNumber = 2,
        showTotal,
        showSizeChanger:showSizeChangerProp,
        pageSizeOptions=[10,20,50,100],
        onChange:onChangeProp,
        onShowSizeChange:onShowSizeChangeProp,
        showQuickJumper=false
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Pagination", customizePrefixCls);

    const [showSizeChanger,setShowSizeChanger]=useControlled({
        controlled:showSizeChangerProp,
        default:false
    });

    const [current, setCurrent] = useControlled({
        controlled: currentProp,
        default: defaultCurrent
    });

    const [pageSize, setPageSize] = useControlled({
        controlled: pageSizeProp,
        default: defaultPageSize
    });

    //是否是arrow
    const [isArrow, setIsArrow] = useState(false);

    const [currentHover, setCurrentHover] = useState(-1);

    const arrowSwitchTimeout = useRef(null);

    //render的数量
    const renderNum = Math.round(total / pageSize);

    const handleSwitchCurrent = (currentIndex) => {
        const index = Math.min(Math.max(currentIndex, 1), renderNum);
        setCurrent(index);
    }

    const renderRange = () => {
        const startRange=(current-1)*pageSize+1;
        const endRange=Math.min(current*pageSize,total);
        return [startRange,endRange];
    }

    const renderMore = React.useCallback((i) => {

        let arrowIcon = i < 2 ? <ArrowDoubleLeft style={{ fontSize: 18 }} /> : <ArrowDoubleRight style={{ fontSize: 18 }} />;
        let jumpDirection = i < 2 ? "left" : "right";

        return <Button
            shape="circle"
            key={`renderPragination-MorePragation-${i}`}
            className={classNames()}
            onClick={() => handleSwitchCurrent(jumpDirection === "left" ? current - jumpNumber : current + jumpNumber)}
            onMouseOver={(e) => {
                if (arrowSwitchTimeout && arrowSwitchTimeout.current) clearTimeout(arrowSwitchTimeout.current);
                setCurrentHover(i);
                if (e.target === e.currentTarget) {
                    setIsArrow(true);
                }
            }
            }
            onMouseOut={(e) => {
                if (e.target === e.currentTarget) {
                    arrowSwitchTimeout.current = setTimeout(() => {
                        setIsArrow(false);
                    }, 200)
                }
            }}
            size={size}
        >
            {(isArrow && currentHover === i) ? arrowIcon : <MoreHorizontal style={{ fontSize: 24 }} />}
        </Button>
    }, [isArrow, currentHover, current,pageSize]);

    const renderMorePagination = React.useCallback(() => {


        let renderPraginationNum = [];
        let renderPragination = [];

        const firstPagination = [
            <Button size={size} shape="circle" key={"startPragination"} className={classNames(
                {
                    [`Selected`]: current === 1
                }
            )} onClick={() => handleSwitchCurrent(1)}>{1}</Button>
        ];

        const lastPagination = [
            <Button size={size} shape="circle" key={"lastPragination"} className={classNames(
                {
                    [`Selected`]: current === renderNum
                }
            )} onClick={() => handleSwitchCurrent(renderNum)}>
                {renderNum}
            </Button>
        ];

        if (current <= 4) {
            renderPraginationNum = [2, 3, 4, 5, "more"]
        }
        if (current >= renderNum - 3) {
            renderPraginationNum = ["more"].concat(Array.from({ length: 4 }, (v, k) => k + renderNum - 4));
        }
        if (current > 4 && current < renderNum - 3) {
            renderPraginationNum = ["more"].concat([current - 1, current, current + 1]).concat(["more"])
        }

        renderPragination.push(firstPagination);

        for (let i = 0; i < renderPraginationNum.length; i++) {
            let item = renderPraginationNum[i];
            let shapeButton = item === "more" ? renderMore(i) : <Button size={size} shape="circle" key={`${item}-renderPragination-${i}`} className={classNames(
                {
                    [`Selected`]: current === item
                }
            )} onClick={() => handleSwitchCurrent(renderPraginationNum[i])}>
                {item}
            </Button>;

            renderPragination.push(shapeButton)
        }

        renderPragination.push(lastPagination);

        return renderPragination;

    }, [current, isArrow, currentHover,pageSize]);

    const renderPagination = useMemo(() => {

        if (renderNum > maxPageNum) {
            return renderMorePagination();
        }

        return new Array(renderNum).fill("").map((item, index) => {
            return <Button size={size} shape="circle" key={index} className={classNames({
                [`Selected`]: current === index + 1
            })} onClick={() => handleSwitchCurrent(index + 1)}>
                {index + 1}
            </Button>
        })
    }, [current, renderNum, isArrow, currentHover,pageSize]);

    const handleSelect=(value)=>{
        setPageSize(value);
    }

    const handleInputNumberBlur=(number,e)=>{ 
        handleSwitchCurrent(number);
    }

    useEffect(()=>{
        if(total>50){
            setShowSizeChanger(true);
        }
    },[total]); 

    useEffect(()=>{
        onChangeProp?.(current,pageSize);
    },[current]);

    useEffect(()=>{
        onShowSizeChangeProp?.(current,pageSize); 
    },[pageSize])

    return <div
        ref={ref}
        className={
            classNames(
                prefixCls,
                {
                    [`${prefixCls}-${capitalize(color)}`]: color
                }

            )
        }
    >
        {showTotal && <div className={`${prefixCls}-ShowTotal`}>{showTotal(total,renderRange())}</div>}
        <Button size={size} shape="circle" onClick={() => handleSwitchCurrent(current - 1)}><KeyboardArrowLeft style={{ fontSize: 24 }} /></Button>
        {renderPagination}
        <Button size={size} shape="circle" onClick={() => handleSwitchCurrent(current + 1)}><KeyboardArrowRight style={{ fontSize: 24 }} /></Button>
        {showSizeChanger && <div className={`${prefixCls}-ShowSizeChanger`}>
            <Select value={pageSize} inputWidth={100} autoWidth onSelect={handleSelect}>
                {pageSizeOptions.map((item,index)=>{
                    return <Select.Option value={item} key={index}>
                        {`${item}条/页`}
                    </Select.Option>
                })}
            </Select>
        </div>}
        {showQuickJumper && <div className={`${prefixCls}-ShowQuickJumper`}>
                {"跳至"}<InputNumber style={{width:60}} onBlur={handleInputNumberBlur} />{"页"}
        </div>}
    </div>

});

export default Pagination;