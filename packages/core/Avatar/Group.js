
import React, { useContext,cloneElement } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types'; 
import childrenToArray from '@packages/utils/childrenToArray';
import Popover from '@packages/core/Popover';
import Avatar from './Avatar';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import "./index.scss";

const Group=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        maxCount,
        maxStyle,
        children:childrenProps,
        maxPopoverPlacement="top",
        className,
        style
    }=props;

    let children;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("AvatarGroup", customizePrefixCls);

    children=childrenToArray(childrenProps).map((child,index)=>{
        return cloneElement(child,{
            key:`avatar-key-${index}`
        })
    });

    const numOfChildren=children.length;

    if(maxCount && maxCount<numOfChildren){
        const childrenShow=children.slice(0,maxCount);
        const childrenHidden=children.slice(maxCount,numOfChildren);

        childrenShow.push(
            <Popover
                key="avatar-popover-key"
                content={childrenHidden}
                trigger="hover"
                placement={maxPopoverPlacement}
            >
                <Avatar style={maxStyle}>{`+${numOfChildren-maxCount}`}</Avatar>
            </Popover>
        )

        return (
            <div className={classNames(`${prefixCls}`,className)} style={style}>
                {childrenShow}
            </div>
        )
    }

    return (
        <div className={classNames(`${prefixCls}`,className)} style={style}>
            {children}
        </div>
    )


});

Group.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string, 
    children: PropTypes.any
};

export default Group;