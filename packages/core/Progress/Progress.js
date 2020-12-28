
import React, { useCallback, useContext, useEffect ,useRef  } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';
import MutationObserver from '@packages/core/MutationObserver';
import "./index.scss";

const defaultFormat = (percent, successPercent) => {
    return percent + "%";
}

const Progress = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        //是否显示进度数值或状态图标 
        showInfo = true,
        color = "primary",
        type = "liner",
        percent = 0,
        format = defaultFormat,
        //进度条完成时的回调
        onFinish,
        backgroundTransparency=false,
        duration=200
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Progress", customizePrefixCls);

    const inlineBarRef=useRef(null); 

    const currentPercent=useRef(percent); 

    const statePercent=useRef(percent);

    statePercent.current=percent;

    let percentInterval=useRef(null);

    const handleChange=useCallback((node,cssValue)=>{ 
        if(cssValue){
            cssValue=cssValue.split("(")[1].split("%")[0];
            if(cssValue==0){ 
                const endTimeOut=setTimeout(()=>{  
                    onFinish?.(percent);
                    clearTimeout(endTimeOut);
                },duration)
            }
        }; 
    },[duration,onFinish]);

    const renderLiner = () => {

        let lineStyle = {};

        let transform = percent - 100;

        lineStyle.transform = `translateX(${transform}%)`; 
        lineStyle.transitionDuration= `${duration}ms`; 

        return (
            <div className={classNames(
                `${prefixCls}-Bar`,
                {
                    [`${prefixCls}-BackgroundTransparency`]:backgroundTransparency
                }
            )}>
                <MutationObserver onChange={handleChange} >
                    <div className={classNames(
                        `${prefixCls}-InlineBar`
                    )} style={lineStyle} ref={inlineBarRef}></div>
                </MutationObserver>
            </div>
        )
    }
    

    const renderInfo = () => {
        if(!showInfo){
            return null;
        } 

        //为了配合文字过渡效果
        if(!percentInterval.current){
            percentInterval.current=setInterval(()=>{ 
                currentPercent.current=statePercent.current;
                if(currentPercent.current==100){   
                    clearInterval(percentInterval.current);
                }
            },duration); 
        }
         
        return (
            <div className={`${prefixCls}-Label`}>
                {format(currentPercent.current)}
            </div>
        )
    };
 

    return (
        <div
            className={classNames(prefixCls, {
                [`${prefixCls}-${capitalize(color)}`]: color,
                [`${prefixCls}-Type${capitalize(type)}`]: type,
            })}
        >
            { type === "liner" ? renderLiner() : null}
            { renderInfo()}
        </div>
    )
});

export default Progress;