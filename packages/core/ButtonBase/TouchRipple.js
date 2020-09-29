import React from 'react';
import classNames from '@packages/utils/classNames';
import { TransitionGroup } from 'react-transition-group';
import Ripple from './Ripple';
import PropTypes from 'prop-types';

const DURATION = 500;

const TouchRipple=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        center: centerProp = false,  
        square,
        ...restProps
    }=props;

    const prefixCls=`${customizePrefixCls}-TouchRipple`;

    const [ripples, setRipples] = React.useState([]);

    const nextKey = React.useRef(0);

    const container = React.useRef(null);

    const rippleCallback = React.useRef(null);

    const startCommit = React.useCallback(
      params => {
        const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
  
        setRipples(oldRipples => [
          ...oldRipples,
          <Ripple
            key={nextKey.current} 
            prefixCls={prefixCls}
            timeout={DURATION}
            pulsate={pulsate}
            rippleX={rippleX}
            rippleY={rippleY}
            rippleSize={rippleSize}
          />,
        ]);
        nextKey.current += 1;
        rippleCallback.current = cb;
      },
      [],
  );

    const start=React.useCallback((event={},options = {}, cb)=>{
        const {
            pulsate = false,
            center = centerProp || options.pulsate,
            fakeElement = false, // For test purposes
        } = options;

        if (event.type === 'mousedown' && ignoringMouseDown.current) {
            ignoringMouseDown.current = false;
            return;
        }

        if (event.type === 'touchstart') {
            ignoringMouseDown.current = true;
        }

        const element = fakeElement ? null : container.current;

        const rect = element
        ? element.getBoundingClientRect()
        : {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
          };

           // Get the size of the ripple
        let rippleX;
        let rippleY;
        let rippleSize;

        if (center || (event.clientX === 0 && event.clientY === 0) || (!event.clientX && !event.touches)) {
            rippleX = Math.round(rect.width / 2);
            rippleY = Math.round(rect.height / 2);
        } else {
            const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
            const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
            //相对于元素的x、y
            rippleX = Math.round(clientX - rect.left);
            rippleY = Math.round(clientY - rect.top);
        }
        if (center) { 
            let radius=Math.sqrt(Math.pow(rippleX,2)+Math.pow(rippleY,2));
            rippleSize = radius*2; 

            if(square){
              rippleSize=rippleX*2;
            }
        }else { 

            const sizeX =
              Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX);
            const sizeY =
              Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY);

            rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2)*2;
        }

        startCommit({ pulsate, rippleX, rippleY, rippleSize, cb });
    },[startCommit,centerProp]);

    

    React.useEffect(() => {
        if (rippleCallback.current) {
          rippleCallback.current();
          rippleCallback.current = null;
        }
    }, [ripples]);

    const pulsate = React.useCallback(() => {
        start({}, { pulsate: true });
    }, [start]);

    const stop = React.useCallback((event, cb) => {
      
        setRipples(oldRipples => {
          if (oldRipples.length > 0) {
            return oldRipples.slice(1);
          }
          return oldRipples;
        });
        rippleCallback.current = cb;
    }, []);

    const ignoringMouseDown = React.useRef(false);

    React.useImperativeHandle(
        ref,
        () => ({
          pulsate,
          start,
          stop,
        }),
        [pulsate, start, stop],
    );     
 
  

    return (
        <span className={classNames(prefixCls)} ref={container} {...restProps}>
            <TransitionGroup component={null} exit {...restProps}>
                {ripples}
            </TransitionGroup>
        </span>
    )

});

TouchRipple.propTypes = {
    //TouchRipple的前缀
    prefixCls:PropTypes.string,
    //center是否居中
    center:PropTypes.bool
}

export default React.memo(TouchRipple);