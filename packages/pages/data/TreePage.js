import React, { useState } from 'react';
import { Tree } from 'antd';
import STree from '@packages/core/STree';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];


const Demo = () => { 

  return <> 
    <STree  treeData={treeData}   height={233} defaultExpandAll   />
    <Tree treeData={treeData} height={233} defaultExpandAll />
   
  </>
};

export default Demo;