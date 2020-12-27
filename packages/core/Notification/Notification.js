
import React from 'react';
import pNotice from '@packages/core/Notice';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

let notificationInstance = {};
let defaultDuration = 4500; 
let defaultPlacement="topRight";
let defaultClosable=true;

function getNotificationInstance(args, callback) { 
    let placement=args.placement;
    if (notificationInstance[placement]) {
        callback({
            instance: notificationInstance[placement],
        });
        return;
    } 
    pNotice(args,(instance)=>{  
        notificationInstance[placement]=instance;
        callback({instance})
    })
}

export function notice(args) {
    let placement=args.placement?args.placement:defaultPlacement;
    let closable=args.closable?args.closable:defaultClosable
    getNotificationInstance({
        ...args, 
        placement:placement,
        closable:closable,
        componentName:`Notification-${capitalize(placement)}`,
        duration:args.duration?args.duration:defaultDuration,
        transition:"slide"
    }, ({instance}) => {
        instance.addNotice({...args,closable:closable});
    }); 
} 

const Message = {
    open: notice, 
}

export default Message;