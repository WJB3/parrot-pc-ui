import React, { useState } from 'react';
import { Tree } from 'antd';
import STree from '@packages/core/STree';
import {
  Warning
} from '@packages/core/Icon';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0', 
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0', 
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
    <STree  treeData={treeData}  draggable   />
    <Tree treeData={treeData} draggable   />
    <Warning />
    
  </>
};

export default Demo;