
import React , { useContext,useMemo, useState  } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import Button from '@packages/core/Button';
import useControlled from '@packages/hooks/useControlled';
import {
    KeyboardArrowLeft,KeyboardArrowRight,MoreHorizontal,ArrowDoubleLeft,ArrowDoubleRight
} from '@packages/core/Icon';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

const Pagination=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        current:currentProp,
        defaultCurrent=1,
        pageSize:pageSizeProp,
        defaultPageSize=10,
        maxPageNum=7,
        total,
        color
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Pagination",customizePrefixCls);

    const [current,setCurrent]=useControlled({
        controlled:currentProp,
        default:defaultCurrent
    });

    const [pageSize,setPageSize]=useControlled({
        controlled:pageSizeProp,
        default:defaultPageSize
    });

    //是否是arrow
    const [isArrow,setIsArrow]=useState(false);

    //render的数量
    const renderNum=Math.round(total/pageSize);

    const handleSwitchCurrent=(currentIndex)=>{
        const index=Math.min(Math.max(currentIndex,1),renderNum);
        setCurrent(index);
    }
 

    const renderMore=React.useCallback((i)=>{ 

        let arrowIcon=i<2?<ArrowDoubleLeft style={{fontSize:18}} />:<ArrowDoubleRight  style={{fontSize:18}}/>; 
        
        return <div  
                    style={{lineHeight:0}}
                    onMouseOver={(e)=>{setIsArrow(true)}}
                    onMouseOut={(e)=>{setIsArrow(false)}}
                >
                    {isArrow?arrowIcon:<MoreHorizontal style={{fontSize:24}} />}
                </div>
    },[isArrow]);

    const renderMorePagination=React.useCallback(()=>{
 

        let renderPraginationNum=[];
        let renderPragination=[];

        const firstPagination=[
            <Button shape="circle" key={"startPragination"} className={classNames(
                {
                    [`Selected`]:current===1
                }
            )} onClick={()=>handleSwitchCurrent(1)}>{1}</Button>
        ];

        const lastPagination=[
            <Button shape="circle"  key={"lastPragination"} className={classNames(
                {
                    [`Selected`]:current===renderNum
                }
            )} onClick={()=>handleSwitchCurrent(renderNum)}>
                {renderNum}
            </Button>
        ];

        if(current<=4){
            renderPraginationNum=[2,3,4,5,"more"]
        }
        if(current>=renderNum-3){
            renderPraginationNum=["more"].concat(Array.from({length:4}, (v,k) => k+renderNum-4));
        }
        if(current>4 && current<renderNum-3){
            renderPraginationNum=["more"].concat([current-1,current,current+1]).concat(["more"])
        }

        renderPragination.push(firstPagination);

        for(let i=0;i<renderPraginationNum.length;i++){
            let item=renderPraginationNum[i];
            renderPragination.push(<Button shape="circle" key={`${item}-renderPragination-${i}`} className={classNames(
                {
                    [`Selected`]:current===item
                }
            )} onClick={()=>handleSwitchCurrent(renderPraginationNum[i])}>
                {item==="more"?renderMore(i):item}
            </Button>)
        }
        
        renderPragination.push(lastPagination);
        
        return renderPragination;

    },[current,isArrow]);

    const renderPagination=useMemo(()=>{

        if(renderNum>maxPageNum){
            return renderMorePagination();
        }
        
        return new Array(renderNum).fill("").map((item,index)=>{
            return <Button shape="circle" key={index} className={classNames({
                    [`Selected`]:current===index+1
                })} onClick={()=>handleSwitchCurrent(index+1)}>
                {index+1}
            </Button>
        }) 
    },[current,renderNum,isArrow]);

    return <div
        ref={ref}
        className={
            classNames(
                prefixCls,
                {
                    [`${prefixCls}-${capitalize(color)}`]:color
                }
                
            )
        }
    >
        <Button shape="circle" onClick={()=>handleSwitchCurrent(current-1)}  ><KeyboardArrowLeft style={{fontSize:24}}/></Button>
            {renderPagination}
        <Button shape="circle" onClick={()=>handleSwitchCurrent(current+1)}   ><KeyboardArrowRight style={{fontSize:24}}/></Button>
    </div>

});

export default Pagination;