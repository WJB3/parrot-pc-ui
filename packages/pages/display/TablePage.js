import React, { useRef } from 'react';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import useBreakpoint from '@packages/hooks/useBreakpoint';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name', 
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, 
  {
    title: 'Action',
    key: 'action', 
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park', 
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park', 
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park', 
  },
];



const Page = React.forwardRef((props, ref) => {

  const buttonRef = useRef(null);
 
  return <div>
    <Table  columns={columns} dataSource={data} scroll={{ y: 100 }} />
  </div>
});

export default Page;