import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';

const Header=React.forwardRef((props,ref)=>{

    const { 
        prefixCls:customizePrefixCls,
        title,
        avatar,
        subtitle,
        actions,
        titleStyle,
        subtitleStyle,
        actionsStyle,
        avatarStyle,
        style,
        className
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Card-Header",customizePrefixCls);

    let avatarNode;

    if(avatar){
        avatarNode=<div className={`${prefixCls}-Avatar`} style={avatarStyle}>
            {avatar}
        </div>
    }

    let contentNode;
    if(title || subtitle){
        contentNode=<div className={`${prefixCls}-Content`}>
            {title && <div className={`${prefixCls}-Content-Title`} style={titleStyle}>{title}</div>}
            {subtitle && <div className={`${prefixCls}-Content-SubTitle`} style={subtitleStyle}>{subtitle}</div>}
        </div>
    }

    let actionsNode;
    if(actions){
        actionsNode=<div className={`${prefixCls}-Actions`} style={actionsStyle}>
            {actions}
        </div>
    }

    return <div className={classNames(
        prefixCls,className
    )} ref={ref} style={style}>
         {avatarNode}
         {contentNode}
         {actionsNode}
    </div>;
})
 

export default Header;