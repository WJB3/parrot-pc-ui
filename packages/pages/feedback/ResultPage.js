import React, { useContext, useEffect, useState, useRef } from 'react';
import { Result as ResultA } from 'antd';
import '@packages/icon/svg/404.svg';

import Button from '@packages/core/Button';
import Result from '@packages/core/Result';
import Card from '@packages/core/Card';
import 'antd/dist/antd.css';


const Page = React.forwardRef((props, ref) => {

  return <React.Fragment>
    <Card>
      <Result
        color="403"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button color="primary" outline>
            Go Console
                </Button>,
          <Button color="danger" outline>Buy Again</Button>,
        ]}
      />
    </Card>
  </React.Fragment>
});

export default Page;