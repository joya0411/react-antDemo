import React from 'react';
import { Row, Col } from 'antd';
import {Tabs,Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
    render(){
        const settings = {
            dots:true,
            autoplay:true,
            infinite:true,
            speed:500,
            slidesToShow:1
        };
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="clearfix">
                            <div class="leftcontainer">
                                <div className="Carousel">
                                    <Carousel {...settings}>
                                        <div><img src="../../images/carousel_1.jpg" alt=""/></div>
                                        <div><img src="../../images/carousel_2.jpg" alt=""/></div>
                                        <div><img src="../../images/carousel_3.jpg" alt=""/></div>
                                        <div><img src="../../images/carousel_4.jpg" alt=""/></div>
                                    </Carousel>
                                </div>
                                <PCNewsImageBlock type="top" count="6" title="头条新闻" imageWidth="33.33%"/>
                            </div>
                            <Tabs class="tabs_news">
                                <TabPane tab="新闻" key="top">
                                    <PCNewsBlock type="top" count="22"/>
                                </TabPane> 
                                <TabPane tab="社会" key="shehui">
                                    <PCNewsBlock type="shehui" count="22"/>
                                </TabPane> 
                                <TabPane tab="国内" key="guonei">
                                    <PCNewsBlock type="guonei" count="22"/>
                                </TabPane> 
                                <TabPane tab="国际" key="guoji">
                                    <PCNewsBlock type="guoji" count="22"/>
                                </TabPane> 
                            </Tabs>
                            <Tabs class="tabs_news">
                                <TabPane tab="我的产品" key="myProduct">
                                    <PCProduct/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div>
                            <PCNewsImageBlock type="keji" count="20" title="科技新闻" imageWidth="10%"/>
                            <PCNewsImageBlock type="yule" count="10" title="娱乐新闻" imageWidth="10%"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}