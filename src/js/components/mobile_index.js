import React from 'react';
import ReactDOM from 'react-dom';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
// import MobileListPullRefresh from './mobile_list_pull_refresh';

import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component{
    render(){
        return (
          <div>
              <MobileHeader/>
              <Tabs>
                  <TabPane tab="头条" key="top">
                      <MobileList count="10" type="top"/>
                  </TabPane>
                  <TabPane tab="社会" key="shehui">
                      <MobileList count="10" type="shehui"/>
                  </TabPane>
                  <TabPane tab="国内" key="guonei">
                      <MobileList count="10" type="guonei"/>
                  </TabPane>
                  <TabPane tab="国际" key="guoji">
                      <MobileList count="10" type="guoji"/>
                  </TabPane>
                  <TabPane tab="娱乐" key="yule">
                      <MobileList count="10" type="yule"/>
                  </TabPane>
                  <TabPane tab="体育" key="tiyu">
                      <MobileList count="10" type="tiyu"/>
                  </TabPane>
                  <TabPane tab="科技" key="keji">
                      <MobileList count="10" type="keji"/>
                  </TabPane>
              </Tabs>
              <MobileFooter/>
          </div>
        );
    };
}

