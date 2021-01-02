import React from 'react';
import { Table,Button } from 'antd';
import RCTable from '@packages/core/Table/rc-table';
import TestTable from '@packages/core/Table/test-table';
import MyTable from '@packages/core/Table';
import 'antd/dist/antd.css'; 

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {}
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    children:[
      {title:"name1",dataIndex:"name1"},
      {title:"name2",dataIndex:"name2"}
    ]
  },
  {
    title: "Age",
    dataIndex: "age", 
  },
  {
    title: "Home phone",
    colSpan: 2,
    dataIndex: "tel",
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {}
      }; 
      return obj;
    }
  },
  {
    title: "Phone",
    colSpan: 0,
    dataIndex: "phone", 
  },
  {
    title: "Address",
    dataIndex: "address", 
  }
];

const data = new Array(100).fill("").map((item,index)=>({
  key:index,
  name:"John Brown"+index,
  name1:"John Brown"+index,
  name2:"John Brown"+index,
  age:"32"+index,
  tel:"0571-22098909"+index,
  phone:"12312312312asdasdasasasdaasdass"+index,
  address:"Ner"+index
}));
 

const Page = React.forwardRef((props, ref) => { 
  
 
  return <div style={{background:"#f5f5f5",padding:10}}>
    <Table  columns={columns} dataSource={data} pagination={{position:["bottomRight","topLeft"]}} /> 
    <div style={{height:20}}></div>
    <RCTable  columns={columns} data={data} prefixCls={"ant-table"} />
    <div style={{height:20}}></div>
    <MyTable  columns={columns} dataSource={data}   /> 
    <div style={{height:20}}></div>
  </div>
});

export default Page;