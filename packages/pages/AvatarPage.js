import React from 'react';
import Tabs,{TabPane} from '@packages/core/Tabs';
import Paper from '@packages/core/Paper';
import Icon from '@packages/icons';
// import { Tabs  } from 'antd';
// const { TabPane } = Tabs;


import 'antd/dist/antd.css';

const tabs=[
  {name:"生物1",key:"1"},
  {name:"生物2",key:"2"},
  {name:"生物3",key:"3"},
  {name:"生物4",key:"4"},
  {name:"生物5",key:"5"},
  {name:"生物6",key:"6"},
  {name:"生物7",key:"7"},
  {name:"生物8",key:"8"},
  {name:"生物9",key:"9"},
  {name:"生物10",key:"10"},
  {name:"生物11",key:"11"},
  {name:"生物12",key:"12"},
  {name:"生物13",key:"13"},
  {name:"生物14",key:"14"},
  {name:"生物15",key:"15"},
];


const Page = React.forwardRef((props, ref) => {
  return <React.Fragment>
   
    <Tabs  defaultActiveKey="1"  type="line"  onEdit={(key,action)=>console.log(key ,action )}>
      {
        tabs.map((tab)=>(
          <TabPane tab={tab.name} key={tab.key} forceRender={false}>               
          <div style={{width:"100%",height:500 }}>Content of Tab Pane {tab.name}</div>
          </TabPane>
        ))
      }
     
    </Tabs>
     
  </React.Fragment>
});

export default Page;