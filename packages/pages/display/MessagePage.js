import React, { useState } from 'react';
import { message,Button } from 'antd';
import Message from '@packages/core/Message';
 
import 'antd/dist/antd.css'; 

const ModalPage = () => { 

  const showModal = () => {
    Message.open({
      content:"我是一个提示框！"
    }); 
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