import React ,{useContext }from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext 
} from '@packages/core/ConfigProvider'; 
import Tooltip from '@packages/core/Tooltip';
import "./index.scss";

const Popover=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        component: Component = 'div', 
        children, 
        title,
        content,
        arrow=true,
        ...restProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Popover",customizePrefixCls); 

    return (
        <Tooltip 
            {...restProps}
            className={
                prefixCls
            }
            title={
                <div className={classNames(`${prefixCls}-Content`)}>
                        {!!title && <div className={classNames(`${prefixCls}-Content-Title`)}>{title}</div>}
                        <div className={classNames(`${prefixCls}-Content-Main`)}>{content}</div>
                </div>
            }
            arrow={arrow}
            shadow={10}
            color={"#fff"}
        >
            {
                React.cloneElement(children)
            }
        </Tooltip>
    )
});

Popover.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any,
    component:PropTypes.string, 
    shadow:PropTypes.number,
    style:PropTypes.object
};

export default Popover;