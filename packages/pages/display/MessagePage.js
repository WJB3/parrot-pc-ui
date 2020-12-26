import React, { useState } from 'react';
import { message, Button } from 'antd';
import Message from '@packages/core/Message';

import 'antd/dist/antd.css';
   

const ModalPage = () => {

  const showModal = () => {
    Message.open({
      content: "我是一个提示框！",
   
    }); 
    Message.success({
      content: "我是一个提示框！",
   
    }); 
    Message.warning({
      content: "我是一个提示框！",
   
    }); 
    Message.error({
      content: "我是一个提示框！",
   
    }); 
    Message.info({
      content: "我是一个提示框！",
   
    }); 
    //message.info('This is a normal message',3);
    
  };



  return (
    <>
      <Button onClick={showModal} >
        Open Modal
      </Button>
    </>
  );
};

export default ModalPage;