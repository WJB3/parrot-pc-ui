
import React from 'react';
import pNotice from '@packages/core/Notice';

let messageInstance=null;
let defaultDuration=3;
let defaultTop;
let key = 1;
let maxCount;

function notice(args){
    const target = args.key || key++;
    const closePromise=new Promise(resolve=>{
        console.log("closePromise")
        const callback=()=>{

        }
        pNotice(args,(instance)=>{
            console.log(instance)
            instance.addNotice(args);
        });
    })
    const result = () => {
        if (messageInstance) {
          messageInstance.removeNotice(target);
        }
    };
    result.promise = closePromise;
    return result;
}

function setMessageConfig(options){
    if(options.top!==undefined){
        defaultTop=options.top;
        messageInstance=null;
    }
    if(options.duration!==undefined){
        defaultDuration=options.duration; 
    }
    if (options.maxCount !== undefined) {
        maxCount = options.maxCount;
        messageInstance = null;
    }
}

const Message={
    open:notice,
    config:setMessageConfig,

}

export default Message;