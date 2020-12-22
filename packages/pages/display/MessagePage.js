import React, { useState } from 'react';
import { message,Button } from 'antd';
 
import 'antd/dist/antd.css'; 

const ModalPage = () => { 

  const showModal = () => {
    message.info('This is a normal message'); 
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