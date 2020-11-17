
import React , { useContext,useMemo  } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import Button from '@packages/core/Button';
import useControlled from '@packages/hooks/useControlled';
import {
    KeyboardArrowLeft,KeyboardArrowRight
} from '@packages/core/Icon';
import "./index.scss";

const Pagination=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        current:currentProp,
        defaultCurrent,
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

    //render的数量
    const renderNum=Math.round(total/pageSize);

    const renderPagination=useMemo(()=>{

        if(renderNum>maxPageNum){
            return null;
        }
        
        return new Array(renderNum).fill("").map((item,index)=>{
            return <Button shape="circle" type="text" >
                {index+1}
            </Button>
        }) 
    },[current,renderNum]);

    return <div
        ref={ref}
        className={
            classNames(
                prefixCls
            )
        }
    >
        <Button shape="circle" type="text" ><KeyboardArrowLeft style={{fontSize:24}}/></Button>
        {renderPagination}
        <Button shape="circle" type="text" ><KeyboardArrowRight style={{fontSize:24}}/></Button>
    </div>

});

export default Pagination;