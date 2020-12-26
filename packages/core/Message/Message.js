
import React from 'react';
import pNotice from '@packages/core/Notice';
import "./index.scss";

let messageInstance = null;
let defaultDuration = 3000;
let defaultTop; 
let maxCount;

function getNotificationInstance(args, callback) { 
    if (messageInstance) {
        callback({
            instance: messageInstance,
        });
        return;
    } 
    pNotice(args,(instance)=>{  
        messageInstance=instance;
        callback({instance})
    })
}

export function notice(args) { 
    getNotificationInstance({
        ...args,
        type:"message",
        componentName:"Message",
        duration:args.duration?args.duration:defaultDuration
    }, ({instance}) => {
        instance.addNotice(args);
    }); 
}

function setMessageConfig(options) {
    if (options.top !== undefined) {
        defaultTop = options.top;
        messageInstance = null;
    }
    if (options.duration !== undefined) {
        defaultDuration = options.duration;
    }
    if (options.maxCount !== undefined) {
        maxCount = options.maxCount;
        messageInstance = null;
    }
}

const Message = {
    open: notice,
    config: setMessageConfig,
}

export default Message;