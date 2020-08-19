import React from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import capitalize from '@packages/utils/capitalize';
import useImageLoad from '@packages/hooks/useImageLoad';
import Icon from '@packages/icons';
import "./index.scss";

const Avatar = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        component: Component = "div",
        className,
        size = "default",
        children: childrenProp,
        type = "circle",
        src,
        srcSet,
        alt,
        imgProps,
        color="default",
        ...restProps
    } = props;

    const prefixCls = usePrefixCls('Avatar', customizePrefixCls);

    let children = null;

    const loaded = useImageLoad({ src, srcSet });
    const hasImg = src || srcSet;
    const hasImgNotFailing = hasImg && loaded !== 'error';

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
    } else if (childrenProp != null) {
        children = childrenProp;
    } else if(loaded == 'error'){
        children=<Icon name={"Person"} />
    }

    return (
        <Component
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-${capitalize(type)}`]:type,
                    [`${prefixCls}-Color${capitalize(color)}`]:color && !hasImgNotFailing
                }
            )}
            ref={ref}
            {...restProps}
        >
            {children}
        </Component>
    )
});

Avatar.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    children: PropTypes.any,
    component: PropTypes.string,
    alt: PropTypes.string,
    imgProps:PropTypes.object,
    restProps:PropTypes.object
};

export default Avatar;