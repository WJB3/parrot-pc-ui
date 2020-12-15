import React from 'react';
import classNames from '@packages/utils/classNames';
import { ConfigContext } from '@packages/core/ConfigProvider';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

const Loading = (Props) => {

    const SIZE = 44;

    const {
        prefixCls: customizePrefixCls,
        className,
        thickness = 3.6,
        size = 40,
        style,
        color = "primary",
        children,
        overlayColor = "rgba(0,0,0,.1)",
        loading = true,
        description = "",
        descriptionColor,
        fullScreen,
        ...restProps
    } = Props;

    const prefixCls = React.useContext(ConfigContext)?.getPrefixCls("Loading", customizePrefixCls);

    const classes = classNames(prefixCls, className);

    const loadingNode = (<div className={classes} {...restProps} style={{ width: size, height: size, ...style }}>
        <svg className={classNames(`${prefixCls}-svg`)} viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
            <circle className={classNames(
                `${prefixCls}-Circle`,
                `${prefixCls}-Indeterminate`,
                {
                    [`${prefixCls}-${capitalize(color)}`]: color
                }
            )}
                cx={SIZE}
                cy={SIZE}
                r={(SIZE - thickness) / 2}
                fill="none"
                strokeWidth={thickness}
            ></circle>
        </svg>
    </div>)

    return children || fullScreen ? <div className={classNames(`${prefixCls}-Container`)}>
        {
            loading && <div className={classNames(`${prefixCls}-Overlay`, {
                [`${prefixCls}-FullScreen`]: fullScreen
            })} style={{ backgroundColor: overlayColor }}>
                {
                    description ?
                        <div className={classNames(`${prefixCls}-Overlay-TipContainer`)}>
                            <div>{loadingNode}</div>
                            <div style={{ lineHeight: "initial", ...descriptionColor }}>
                                {description}
                            </div>
                        </div>
                        : loadingNode}
            </div>}
        {children}
    </div> : loadingNode
}


export default Loading;