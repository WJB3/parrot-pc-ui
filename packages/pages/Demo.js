import React, { useState, useCallback, useMemo } from 'react';
import TransitionR from '@packages/core/ReactTransitionGroup/Transition';
import Button from '@packages/core/Button';
import { Fade,Collapse } from '@packages/core/Transition';

let demo=[{id:0,name:"安徽省",parentId:null},{id:1,name:"合肥市",parentId:0},{id:2,name:"肥东县",parentId:1}];

 
function treeData(source, id, parentId, children){   
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father=>{ 
      let branchArr = cloneData.filter(child => father[id] == child[parentId]);
      branchArr.length>0 ? father[children] = branchArr : ''
      return father[parentId] ==null        // 如果第一层不是parentId=0，请自行修改
  })
}

console.log(treeData(demo, 'id', 'parentId', 'children'))

export default function App() {

  const [visible, setVisible] = useState(false);

  const statusStyle = {
    exited: { opacity: 0 },
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 }
  }

  return (
    <div>
      

      <Collapse visible={visible} timeout={5000}>
        <div
          style={{ background: 'red', width: 200, height: 200 }}
        >{"测试"}</div>
      </Collapse>

      <Button onClick={() => setVisible(!visible)}>显示</Button>

    </div>
  );
}

