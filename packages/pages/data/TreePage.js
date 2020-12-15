import React, { useState } from 'react';
import { Tree } from 'antd';
import STree from '@packages/core/STree';


const treeDataa = [
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

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(list, key, children){
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    } else if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

const Demo = () => {
  const [treeData, setTreeData] = useState(treeDataa);

  function onLoadData({ key, children }) {
    return new Promise(resolve => { 
      setTimeout(() => {
        setTreeData(origin =>
          updateTreeData(origin, key, [
            { title: 'Child Node', key: `${key}-0` }, 
          ]),
        ); 
        resolve();
      }, 1000);
    });
  }

  return <> 
    <STree  treeData={treeData} draggable  />
    <Tree  treeData={treeData} draggable />
   
  </>
};

export default Demo;