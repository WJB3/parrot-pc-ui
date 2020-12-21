import React, { useState } from 'react';
import { Modal } from 'antd';
import ModalA from '@packages/core/Modal'; 
import Button from '@packages/core/Button';
import InputText from '@packages/core/InputText';
import Draggable from 'react-draggable';
import {
  CloseSquare
} from '@packages/core/Icon';
import 'antd/dist/antd.css'; 

const ModalPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => { 
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} >
        Open Modal
      </Button> 
      {/* <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
      <ModalA 
            visible={isModalVisible} 
            title="Parrot Modal" 
            onCancel={handleCancel} 
            cancelText={"有危险？"}    
            okText={"你确定"}
            okColor={"info"}
            onOk={handleOk}
      >
        <InputText />
      </ModalA> 
    </>
  );
};

export default ModalPage;