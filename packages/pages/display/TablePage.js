import React from 'react';
import { Table,Button } from 'antd';
import RCTable from '@packages/core/Table/rc-table';
import TestTable from '@packages/core/Table/test-table';
import MyTable from '@packages/core/Table';
import VirtualList from '@packages/core/VirtualList';
import 'antd/dist/antd.css'; 

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name', 
    colSpan:3,
    render: (text, row, index) => {
      if (index < 4) {
        return <a>{text}</a>;
      }
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    render: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    render: (value, row, index) => {
      const obj = {
        children: <Button>{value}</Button>,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];


const Page = React.forwardRef((props, ref) => { 
  let strs="范德萨发生的范德萨范德萨范德萨范德萨范德萨发生的范范德萨发生的范德\n萨范德萨范德萨范德萨范德萨发生的范德萨范德萨范德萨范德萨范德萨发生的范德萨范德萨范德萨范德萨范德萨发生的范德萨范德萨范德萨范德萨德萨范德萨范德萨范德萨范德萨发生的范德萨范德萨范德萨范德萨范德萨发生的范德萨";
  const str = Array(9999999).fill(strs) 
  return <div>
       
       <VirtualList data={str} height={1000} itemHeight={30} itemKey="id">
                {item=> <div style={{whiteSpace:"pre"}}>
                    {item}
                </div>} 
        </VirtualList>
 
  </div>
});

export default Page;