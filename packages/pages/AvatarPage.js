import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
import 'antd/dist/antd.css';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Tabs defaultActiveKey="1"  >
    <TabPane tab="Tab 1" key="1" forceRender={false}>
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2" forceRender={false}>
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3" forceRender={false}>
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
    </React.Fragment>
});

export default Page;