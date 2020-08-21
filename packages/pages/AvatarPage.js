import React from 'react';
import Tabs,{TabPane} from '@packages/core/Tabs';
import Paper from '@packages/core/Paper';
// import { Tabs  } from 'antd';
//const { TabPane } = Tabs;


import 'antd/dist/antd.css';


const Page = React.forwardRef((props, ref) => {
  return <React.Fragment>
   
    <Tabs  defaultActiveKey="1"  type="card" >
      <TabPane tab="生物" key="1" forceRender={false}>               
        <div style={{width:"100%",height:500 }}>Content of Tab Pane 1</div>
      </TabPane>
      <TabPane tab="化学" key="2" forceRender={false} >
      <div style={{width:"100%",height:600 }}>Content of Tab Pane 2</div>
      </TabPane>
      <TabPane tab="地理" key="3" forceRender={false} >
      <div style={{width:"100%",height:700 }}>Content of Tab Pane 3</div>
      </TabPane>
    </Tabs>
     
  </React.Fragment>
});

export default Page;