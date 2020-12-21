import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';

export default function confirm(config){
    const div = document.createElement('div');
    document.body.appendChild(div);

    let currentConfig = { ...config, visible: true } ;

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

    return {
        destroy: close,
        update,
    };

}