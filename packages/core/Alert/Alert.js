
import React , { useCallback, useContext } from 'react';
import { ConfigContext } from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';

import { DragSource } from 'react-dnd';
import {
    OutlineWarning,
    OutlineError,
    OutlineInfo,
    OutlineSuccess
} from '@packages/core/Icon';
import Paper from '@packages/core/Paper';
import "./index.scss";

function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      {
        if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
          error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
        }
      }
    }
  
    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      // As a workaround to support multiple concurrent renderers, we categorize
      // some renderers as primary and others as secondary. We only expect
      // there to be two concurrent renderers at most: React Native (primary) and
      // Fabric (secondary); React DOM (primary) and React ART (secondary).
      // Secondary renderers store their context values on separate fields.
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      // Used to track how many concurrent renderers this context currently
      // supports within in a single renderer. Such as parallel server rendering.
      _threadCount: 0,
      // These are circular
      Provider: null,
      Consumer: null
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    };
    var hasWarnedAboutUsingNestedContextConsumers = false;
    var hasWarnedAboutUsingConsumerProvider = false;
  
    {
      // A separate object, but proxies back to the original context object for
      // backwards compatibility. It has a different $$typeof, so we can properly
      // warn for the incorrect usage of Context as a Consumer.
      var Consumer = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
        _calculateChangedBits: context._calculateChangedBits
      }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here
  
      Object.defineProperties(Consumer, {
        Provider: {
          get: function () {
            if (!hasWarnedAboutUsingConsumerProvider) {
              hasWarnedAboutUsingConsumerProvider = true;
  
              error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
            }
  
            return context.Provider;
          },
          set: function (_Provider) {
            context.Provider = _Provider;
          }
        },
        _currentValue: {
          get: function () {
            return context._currentValue;
          },
          set: function (_currentValue) {
            context._currentValue = _currentValue;
          }
        },
        _currentValue2: {
          get: function () {
            return context._currentValue2;
          },
          set: function (_currentValue2) {
            context._currentValue2 = _currentValue2;
          }
        },
        _threadCount: {
          get: function () {
            return context._threadCount;
          },
          set: function (_threadCount) {
            context._threadCount = _threadCount;
          }
        },
        Consumer: {
          get: function () {
            if (!hasWarnedAboutUsingNestedContextConsumers) {
              hasWarnedAboutUsingNestedContextConsumers = true;
  
              error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
            }
  
            return context.Consumer;
          }
        }
      }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
  
      context.Consumer = Consumer;
    }
  
    {
      context._currentRenderer = null;
      context._currentRenderer2 = null;
    }
  
    return context;
  }

const Alert=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        outline,
        className,
        children,
        color="primary",
        //是否有icon
        hasIcon:hasIconProp=true,
        icon
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Alert",customizePrefixCls);

    const hasIcon=((color==="error"||color==="danger"||color==="warning"||color==="info"||color==="success") && hasIconProp)||icon;

    const IconMap={
        "error":<OutlineError />,
        "danger":<OutlineError />,
        "warning":<OutlineWarning />,
        "info":<OutlineInfo />,
        "success":<OutlineSuccess />
    }

    return (
        <Paper
            ref={ref}
            outline={outline}
            className={
                classNames(
                    className,
                    prefixCls,
                    {
                        [`${prefixCls}-${capitalize(color)}`]:color,
                        [`${prefixCls}-NoOutline`]:!outline
                    }
                )
            }
        >
            {hasIcon && <div className={`${prefixCls}-Icon`}>{icon || IconMap[color]}</div>}
            <div className={`${prefixCls}-Message`}>{children}</div> 
        </Paper>
    );
});

export default Alert;