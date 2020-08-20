import React,{useEffect,useState,useRef} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import useRaf,{ useRafState } from '@packages/hooks/useRaf';
import TabContext from './TabContext';
import ResizeObserver from '@packages/core/ResizeObserver';
import capitalize from '@packages/utils/capitalize'; 
import ButtonBase from '@packages/core/ButtonBase';
import useTabOffsets from '@packages/hooks/useTabOffsets';
import useRefs from '@packages/hooks/useRefs';
import "./index.scss";

const TabNavBar=React.forwardRef((props,ref)=>{

    const { tabs,color }=React.useContext(TabContext);

    const {
        prefixCls:customizePrefixCls,
        className, 
        children,
        tabPosition="top",
        component:Component="div",
        activeKey,
        onTabClick,
        ...restProps
    }=props;

    const tabPositionTopOrBottom=tabPosition==='top'||tabPosition==="bottom";

    const [inkStyle, setInkStyle] = useState();

    const [wrapperScrollWidth,setWrapperScrollWidth]=useState(0);//tab外层div的总宽度

    const prefixCls=usePrefixCls('TabNavBar',customizePrefixCls);
    const prefixClsTab=usePrefixCls('Tab',customizePrefixCls);

    const [getBtnRef,removeBtnRef]=useRefs();

    const tabListRef=useRef();
    const [tabSizes,setTabSizes]=useRafState(new Map());
    const tabOffsets=useTabOffsets(tabs,tabSizes,wrapperScrollWidth);

    const activeTabOffset = tabOffsets.get(activeKey);
 
    const tabNavBarProps={

    } 

    

    const TabNodes=()=>tabs.map(item=>{

        const { key,tab }=item;

        return  <ButtonBase 
                    key={key} 
                    ref={getBtnRef(key)}
                    onClick={e=>{
                        onTabClick?.(key,e);
                    }}
                    className={classNames(
                        prefixClsTab,
                        {
                            [`${prefixClsTab}-Color${capitalize(color)}`]:color,
                            [`Selected`]:activeKey && activeKey===key
                        }
                    )}
                >
                    {tab}
                </ButtonBase>
    });

    const Indicator=()=>{
        return <span className={classNames(`Indicator`)} style={inkStyle}></span>
    }

    const onListHolderResize=useRaf(()=>{

        const newWrapperScrollWidth=tabListRef.current?.offsetWidth||0;

        setWrapperScrollWidth(newWrapperScrollWidth);

        setTabSizes(()=>{
            const newSizes=new Map();
            tabs.forEach(({key})=>{
                const btnNode=getBtnRef(key).current;
                if(btnNode){
                    newSizes.set(key,{
                        width:btnNode.offsetWidth,
                        height:btnNode.offsetHeight,
                        left:btnNode.offsetLeft,
                        top:btnNode.offsetTop
                    })
                }
            })
            return newSizes;
        })
    });

    useEffect(()=>{
        const newInkStyle={};
        if(activeTabOffset){
            if(tabPositionTopOrBottom){
                newInkStyle.left=activeTabOffset.left;
            }
            newInkStyle.width=activeTabOffset.width;
        } 
        setInkStyle(newInkStyle);
    },[activeTabOffset,tabPositionTopOrBottom])


    useEffect(()=>{
        onListHolderResize();
    },[activeKey,tabs.map(tab => tab.key).join('_')])

    return ( 
            <Component
                className={classNames(
                    prefixCls,
                    className
                )}
                ref={ref} 
                {...restProps}
            >
                <div
                    className={
                        classNames(
                            `${prefixCls}-Wrap`
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
                        >
                            <TabNodes />
                            <Indicator />
                        </div>
                    </ResizeObserver>
                    
                </div>
                
            </Component> 
    )
});

TabNavBar.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any,
    tabPosition:PropTypes.oneOf(['top','bottom','left','right']),
    component:PropTypes.string,
    restProps:PropTypes.object,
    activeKey:PropTypes.string,
    onTabClick:PropTypes.func
};

export default TabNavBar;