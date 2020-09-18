import React ,{useContext} from 'react'; 
import { ConfigContext } from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import { generate } from '../utils';

const ParrotIcon=React.forwardRef((props,ref)=>{

    const {
        onClick,
        className,
        icon:target,
        rotate,
        prefixCls:customizePrefixCls
    }=props;


    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Icon",customizePrefixCls); 

    const svgStyle=rotate?{msTransform:`rotate(${rotate}deg)`,transform:`rotate(${rotate})deg`}:undefined;

    const renderIcon=()=>{
        return generate(target.icon,`svg-${target.name}m`,{ 
            onClick,
            style:svgStyle,
            width:'1em',
            height:'1em',
            fill:"currentColor",
        })
    }
 
    return (
        <span
            ref={ref}
            onClick={onClick}
            className={classNames(
                prefixCls,
                className,
            )}
        >
            {
                renderIcon() 
            }
        </span>
    )
});


export default ParrotIcon;