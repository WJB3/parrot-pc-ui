import React,{ useContext,useState,useRef } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types'; 
import capitalize from '@packages/utils/capitalize';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import ResponsiveObserve, {
    responsiveArray
} from '@packages/utils/responsiveObserve';
import useImageLoad from '@packages/hooks/useImageLoad'; 
import { Person } from  "@packages/core/Icon";
import Paper from '@packages/core/Paper';
import useBreakpoint from '@packages/hooks/useBreakpoint';
import useForkRef from '@packages/hooks/useForkRef';
import "./index.scss";

const Avatar = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        component: Component = Paper,
        className,
        size = "default",
        children: childrenProp,
        type = "circle",
        src,
        srcSet,
        alt,
        imgProps,
        color="default",
        icon,
        //字符类型距离左右2侧边界单位像素
        gap=4,
        style,
        onError,
        onLoaded,
        ...restProps
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Avatar", customizePrefixCls);
    const [mounted, setMounted] = useState(false);
    const [scale,setScale]=useState(false);
    const screens =useBreakpoint();
    //string孩子节点
    const avatarChildrenRef=useRef(null);
    const avatarRef=useRef(null);

    React.useEffect(()=>{  
        setScaleParam();
    },[gap]);


    React.useEffect(() => { 
        setMounted(true);
    }, []); 
  

    let children = null;

    const loaded = useImageLoad({ src, srcSet });

    if(loaded==="error"){
        onError?.("error");
    }else if(loaded==="loaded"){
        onLoaded?.("loaded")
    }

    const hasImg = src || srcSet;
    //有src或者srcSet但是图片没有加载成功
    const hasImgNotFailing = hasImg && loaded !== 'error';

    const setScaleParam=()=>{ 
        if(!avatarChildrenRef.current||!avatarRef.current){
            return ;
        }
        const childrenWidth=avatarChildrenRef.current.offsetWidth;
        const nodeWidth=avatarRef.current.offsetWidth;

        if(childrenWidth!==0 && nodeWidth!==0){
            if(gap*2 < nodeWidth){
                setScale(nodeWidth-gap*2<childrenWidth?(nodeWidth-gap*2)/childrenWidth:1)
            }
        } 
    }

    
    if (hasImgNotFailing) {
        children = (
          <img
            alt={alt}
            src={src}
            srcSet={srcSet} 
            className={`${prefixCls}-Image`}
            {...imgProps}
          />
        );
    } else if(loaded == 'error'){
        children=<Person />
    } else if(icon){
        children=icon;
    } else if(mounted||scale!==1){ 

        const transformString=`scale(${scale})`;
        const childrenStyle = {
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString,
        };
        children=(
            <span style={childrenStyle} className={classNames(`${prefixCls}-String`)} ref={avatarChildrenRef}>
                {childrenProp}
            </span>
        )
    } else{
        children=(
            <span style={{opacity:0}} className={classNames(`${prefixCls}-String`)} ref={avatarChildrenRef}>
                {childrenProp}
            </span>
        )
    }

    const renderStyle=()=>{
        let sizeValue;
        if(typeof size==="number"){
            sizeValue=size; 
        }else if(typeof size==="object"){
            const currentBreakpoint=responsiveArray.find(screen=>screens[screen]);
            sizeValue=size[currentBreakpoint]||18; 
        }else if(typeof size==="string"){
            return {}
        } 
        return {
            width: sizeValue,
            height: sizeValue,
            lineHeight: `${sizeValue}px`,
            fontSize: icon ? sizeValue / 2 : 18,
        }
    }

    const handleRef=useForkRef(ref,avatarRef);

    return (
        <Component
            className={classNames(
                prefixCls,
                className,
                { 
                    [`${prefixCls}-Circle`]:type==="circle",
                    [`${prefixCls}-Color${capitalize(color)}`]:color && !hasImgNotFailing,
                    [`${prefixCls}-${capitalize(size)}`]:typeof size==="string"
                }
            )}
            style={{...renderStyle(),...style}}
            ref={handleRef} 
            square={type==="square"}
            {...restProps}
        >
            {children}
        </Component>
    )
});

Avatar.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.any,
    children: PropTypes.any,
    type:PropTypes.oneOf(['circle','round']),
    component: PropTypes.string,
    alt: PropTypes.string,
    src:PropTypes.string,
    srcSet:PropTypes.string,
    imgProps:PropTypes.object,
    restProps:PropTypes.object,
    color:PropTypes.string, 
};

export default Avatar;