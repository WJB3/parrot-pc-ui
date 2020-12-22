import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';
import {
  WarningOutline,
  ErrorOutline,
  SuccessOutline,
  InfoOutline
} from '@packages/core/Icon';
import { destroyFns } from './index';

export default function confirm(config){
    const div = document.createElement('div');
    document.body.appendChild(div);

    let currentConfig = { ...config, visible: true,close };

    function destroy(){
      //close时销毁div框
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
      for (let i = 0; i < destroyFns.length; i++) {
        const fn = destroyFns[i];
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (fn === close) {
          destroyFns.splice(i, 1);
          break;
        }
      }
    }

    function render({visible,...props}){
        ReactDOM.render(
            <Dialog 
                {...props}
                visible={visible}
                getContainer={div}
            />,
            div
        )
    }

    function close() { 
        currentConfig = {
          ...currentConfig,
          visible: false, 
          afterClose:destroy.bind(this)
        };
        render(currentConfig);
    }

    function update(configUpdate) {
        if (typeof configUpdate === 'function') {
          currentConfig = configUpdate(currentConfig);
        } else {
          currentConfig = {
            ...currentConfig,
            ...configUpdate,
          };
        }
        render(currentConfig);
    }

    render(currentConfig);

    destroyFns.push(close);

    return {
        destroy: close,
        update,
    }; 
}

export function withWarning(props){
  return {
    icon:<WarningOutline />,
    type:"warning",
    color:"warning",
    ...props
  }
}

export function withInfo(props){
  return {
    icon:<InfoOutline />,
    type:"info",
    color:"info",
    ...props
  }
}

export function withSuccess(props){
  return {
    icon:<SuccessOutline />,
    type:"success",
    color:"success",
    ...props
  }
}

export function withError(props){
  return {
    icon:<ErrorOutline />,
    type:"error",
    color:"danger",
    ...props
  }
}