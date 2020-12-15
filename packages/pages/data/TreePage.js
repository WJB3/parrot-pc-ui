import React, { useState } from 'react';
import { Tree } from 'antd';
import STree from '@packages/core/STree';


const initTreeDate = [
  { title: 'Expand to load', key: '0' }, 
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
  const [treeData, setTreeData] = useState(initTreeDate);

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
    <STree loadData={onLoadData} treeData={treeData}    />
   
  </>
};

export default Demo;