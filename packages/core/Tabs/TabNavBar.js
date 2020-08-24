import React, { useEffect, useState, useRef } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import useRaf, { useRafState } from '@packages/hooks/useRaf';
import TabContext from './TabContext';
import ResizeObserver from '@packages/core/ResizeObserver';
import capitalize from '@packages/utils/capitalize';
import ButtonBase from '@packages/core/ButtonBase';
import useTabOffsets from '@packages/hooks/useTabOffsets';
import useRefs from '@packages/hooks/useRefs';
import Paper from '@packages/core/Paper';
import Icon from '@packages/icons';
import TabScrollable from '@packages/utils/scrollable';
import animate from '@packages/utils/animate';
import "./index.scss";

const TabNavBar = React.forwardRef(function (props, ref) {

    const { tabs, color } = React.useContext(TabContext);

    const {
        prefixCls: customizePrefixCls,
        className,
        children,
        tabPosition = "top",
        component = Paper,
        activeKey,
        onTabClick,
        shadow,
        style,
        isCard,
        isEdit,
        onEdit,
        centered,
        ...restProps
    } = props;

    const tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === "bottom";
    
    const [ ,forceRender]=useState();

    const [inkStyle, setInkStyle] = useState();

    const [wrapperScrollWidth, setWrapperScrollWidth] = useState(0);//tab外层div的总宽度

    const prefixCls = usePrefixCls('TabNavBar', customizePrefixCls);
    const prefixClsTab = usePrefixCls('Tab', customizePrefixCls);

    const [getBtnRef, removeBtnRef] = useRefs();

    const tabListRef = useRef();
    const [tabSizes, setTabSizes] = useRafState(new Map());
    const tabOffsets = useTabOffsets(tabs, tabSizes, wrapperScrollWidth);
    const IndicatorRef = useRef();

    const activeTabOffset = tabOffsets.get(activeKey);

    const TabNodes = tabs.map(item => {

        const { key, tab } = item;

        return <ButtonBase
            key={key}
            ref={getBtnRef(key)}
            onClick={e => {
                onTabClick?.(key, e);
            }}
            className={classNames(
                prefixClsTab,
                {
                    [`${prefixClsTab}-Color${capitalize(color)}`]: color,
                    [`Selected`]: activeKey && activeKey === key,
                }
            )}
        >
            {tab}
            {isEdit && isCard && <Icon name={"Close"} style={{ marginLeft: 10 }} onClick={() => onEdit?.(key, "delete")} />}
        </ButtonBase>
    });

    const Indicator = (<span
        ref={IndicatorRef}
        className={classNames(`Indicator`)}
        style={{ ...inkStyle, visibility: isCard ? "hidden" : "auto" }}
    ></span>)

    const onListHolderResize = useRaf(() => {

        const newWrapperScrollWidth = tabListRef.current?.offsetWidth || 0;

        setWrapperScrollWidth(newWrapperScrollWidth);

        setTabSizes(() => {
            const newSizes = new Map();
            tabs.forEach(({ key }) => {
                const btnNode = getBtnRef(key).current;
                if (btnNode) {
                    newSizes.set(key, {
                        width: btnNode.offsetWidth,
                        height: btnNode.offsetHeight,
                        left: btnNode.offsetLeft,
                        top: btnNode.offsetTop
                    })
                }
            })
            return newSizes;
        })
    });

    useEffect(() => {
        const newInkStyle = {};
        if (activeTabOffset) {
            if (tabPositionTopOrBottom) {
                newInkStyle.left = activeTabOffset.left;
            }
            newInkStyle.width = activeTabOffset.width;
        }
        setInkStyle(newInkStyle);

    }, [activeTabOffset, tabPositionTopOrBottom])

    useEffect(() => {
        onListHolderResize();
    }, [activeKey, tabs.map(tab => tab.key).join('_')])

    let ComponentProp;

    if (isCard) {
        ComponentProp = component
    } else {
        ComponentProp = component
    }

    const isTabScrollable = TabScrollable(tabListRef.current);

    const handleEndScrollClick = () => {
        moveTabsScroll(tabListRef.current["clientWidth"]);
    };

    const handleStartScrollClick = () => {
        moveTabsScroll(-tabListRef.current["clientWidth"]);
    };

    const moveTabsScroll = delta => {
        let scrollValue = tabListRef.current["scrollLeft"];
        scrollValue += delta *  1;  
        scroll(scrollValue);
    };

    const scroll = scrollValue => { 
        animate("scrollLeft", tabListRef.current, scrollValue,{},()=>{console.log("forceRender");forceRender({})});
    }; 
 
 

    return (
        <ComponentProp
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-Card`]: isCard
                }
            )}
            shadow={shadow}
            ref={ref}
            style={style}
            {...restProps}
        >
            {isTabScrollable && <ButtonBase key={"scroll-start"} className={classNames(
                `${prefixCls}-scollButton`
            )} onClick={handleStartScrollClick}>
                <Icon name={"ArrowLeft"} />
            </ButtonBase>}

            <div
                className={
                    classNames(
                        `${prefixCls}-Wrap`,
                        {
                            [`${prefixCls}-centered`]: centered
                        }
                    )
                }
            >  
                <ResizeObserver onResize={onListHolderResize}>
                    <div
                        ref={tabListRef}
                        className={
                            classNames(
                                `${prefixCls}-Wrap-TabList`
                            )
                        }
                        id={"TabList"}
                        style={{
                            overflowX:isTabScrollable?"scroll":"hidden"
                        }}
                    >
                        {TabNodes}
                        {isCard && <span className={`${prefixCls}-ExtraDiv`}></span>}
                        {Indicator}
                    </div>
                </ResizeObserver>


            </div>

            {isTabScrollable && <ButtonBase key={"scroll-end"} className={classNames(
                `${prefixCls}-scollButton`
            )} onClick={handleEndScrollClick}>
                <Icon name={"ArrowRight"} />
            </ButtonBase>}
            {isCard && <div style={{ ...inkStyle, left: (tabListRef.current?.getBoundingClientRect()?.left - tabListRef.current?.scrollLeft + inkStyle?.left)||0 }} className={classNames("HiddenDiv")}></div>}
        </ComponentProp>
    )
});

TabNavBar.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    tabPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    component: PropTypes.string,
    restProps: PropTypes.object,
    activeKey: PropTypes.string,
    onTabClick: PropTypes.func,
    style: PropTypes.object,
    isCard: PropTypes.bool
};

export default TabNavBar;