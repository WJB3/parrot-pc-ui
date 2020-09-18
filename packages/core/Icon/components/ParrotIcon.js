import React ,{useContext} from 'react'; 
import { ConfigContext,SizeContext } from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';
import { generate } from '../utils';

const ParrotIcon=React.forwardRef((props,ref)=>{

    const {
        onClick,
        className,
        icon:target,
        rotate,
        prefixCls:customizePrefixCls,
        size:sizeProp="default",
        spin,
        style
    }=props;


    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Icon",customizePrefixCls); 

    const svgStyle=rotate?{msTransform:`rotate(${rotate}deg)`,transform:`rotate(${rotate}deg)`}:undefined;

    const size=useContext(SizeContext)||sizeProp; 

    const renderIcon=()=>{
        return generate(target.icon,`svg-${target.name}m`,{ 
            onClick,
            style:svgStyle,
            width:'1em',
            height:'1em',
            className:classNames(
                {
                    [`${prefixCls}-Spin`]:!!spin
                }
            ),
            fill:"currentColor",
        })
    }
 
    return (
        <span
            ref={ref}
            onClick={onClick}
            style={style}
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-${capitalize(size)}`]:size
                }
            )}
        >
            {
                renderIcon() 
            }
        </span>
    )
});


export default ParrotIcon;