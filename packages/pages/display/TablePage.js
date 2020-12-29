import React from 'react';
import { Table } from 'antd';
import RCTable from '@packages/core/Table/rc-table';
import TestTable from '@packages/core/Table/test-table';
import 'antd/dist/antd.css'; 

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name', 
  }, 
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park', 
  }, 
];



const Page = React.forwardRef((props, ref) => { 
 
  return <div>
    <Table  columns={columns} dataSource={data} />
    <RCTable  columns={columns} data={data} prefixCls={"ant-table"} />
    <TestTable  columns={columns} data={data} prefixCls={"ant-table"} />
  </div>
});

export default Page;