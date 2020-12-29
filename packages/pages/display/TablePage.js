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
    {/* <Table  columns={columns} dataSource={data} />
    <RCTable  columns={columns} data={data} prefixCls={"ant-table"} />
    <TestTable  columns={columns} data={data} prefixCls={"ant-table"} /> */}

    <table border="1" style={{width:300,height:200,tableLayout:"fixed"}}>
      <tr>
        <td>哈哈哈哈哈哈哈哈哈哈哈哈哈哈阿时候是大叔大叔大叔大叔阿四大啊大大大叔大叔大叔大啊实打啊实打实大叔大啊实打实大叔大叔啊实打实大叔大啊实打实大叔大叔大叔的啊实打实大叔大啊实打实大叔大啊实打实大叔大实大叔大叔的是打打杀杀是叔啊实打实大叔大叔的 啊实打实大叔大叔的啊实打实大叔大叔大叔 大叔哈</td>
        <td>呵呵</td>
        <td>个个</td>
      </tr>
      <tr>
        <td>弟弟</td>
        <td>个个</td>
        <td>到底</td>
      </tr>
    </table>
  </div>
});

export default Page;