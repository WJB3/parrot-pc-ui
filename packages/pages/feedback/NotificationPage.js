import React, { useState } from 'react';
import { message, Button,notification } from 'antd';
import Notification from '@packages/core/Notification'; 

import 'antd/dist/antd.css';
   

const ModalPage = () => {

  const showModal = () => {
     
    notification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!');
        },  
      }); 
  };

  const showParrot=()=>{
    Notification.error({
        content:"a",
        placement:"topRight"
    })
    Notification.success({
        content:"a",
        placement:"topLeft"
    })
    Notification.warning({
        content:"a",
        placement:"bottomLeft"
    })
    Notification.info({
        content:"a",
        placement:"bottomRight"
    })
  }



  return (
    <>
      <Button onClick={showModal} >
        Open Modal
      </Button> 
      <Button onClick={showParrot} >
        Open Parrot Modal
      </Button> 
    </>
  );
};

export default ModalPage;