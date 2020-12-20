import React, { useState } from 'react';
import { Modal } from 'antd';
import ModalA from '@packages/core/Modal';
import Button from '@packages/core/Button';
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
    console.log("handleCancel")
    setIsModalVisible(false);
  };

  return (
    <>
      <button type="primary" onClick={showModal}>
        Open Modal
      </button>
      {/* <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} mask={false}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
      <ModalA visible={isModalVisible} title="Basic Modal" onCancel={handleCancel}  >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ModalA> 
    </>
  );
};

export default ModalPage;