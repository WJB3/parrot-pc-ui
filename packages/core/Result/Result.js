import React ,{ useContext } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import {
    Success,
    Error,
    Info,
    Warning
} from '@packages/core/Icon';
import NotFound from './notFound';
import ServerError from './serverError';
import Unauthorized from './unauthorized';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

export const IconMap = {
    success: <Success />,
    error: <Error />,
    danger: <Error />,
    info: <Info />,
    warning: <Warning />, 
    '403':<Unauthorized />,
    '404':<NotFound />,
    '500':<ServerError />,
    403:<Unauthorized />,
    404:<NotFound />,
    500:<ServerError />,
}; 

const Result=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        icon,
        color="info",
        title,
        subTitle,
        extra
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Result",customizePrefixCls);



    return (
        <div 
            className={
                classNames(
                    prefixCls
                )
            }
            ref={ref}
        >
            <div className={classNames(`${prefixCls}-Icon`,{
                [`${prefixCls}-${capitalize(color)}`]:color
            })}>{icon || IconMap[color]}</div>
            {title && <div className={classNames(`${prefixCls}-Title`)}>
                {title}
            </div>}
            {subTitle && <div className={classNames(`${prefixCls}-SubTitle`)}>
                {subTitle}
            </div>}
            {extra && <div className={`${prefixCls}-Extra`}>
                {extra}    
            </div>}
        </div>
    )

});

export default Result;