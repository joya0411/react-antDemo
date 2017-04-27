import React from 'react';
import {Row,Col} from 'antd';
import Tloader from 'react-touch-loader';
import ReactPullToRefresh from 'react-pull-to-refresh';

import {
    IndexRoute,
    Router,
    Route,
    hashHistory,
    Link
} from 'react-router';

export default class MobileList extends React.Component{
    constructor(){
        super();
        this.state = {
            news:'',
            count:10
        }
    };
    componentWillMount(){
        var myFetchOptions = {
            method:'GET'
        };
        var fetchUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+ this.props.type +'&count='+ this.props.count;

        fetch(fetchUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                news: json
            })
        });
    };
    
    handleRefresh(resolve,reject){
        var myFetchOptions = {
            method:'GET'
        };
        var fetchUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=yule&count=10';

        fetch(fetchUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                news: json
            });
            resolve();
        });
    };
    render(){
        const {initializing,hasMore,autoLoadMore} = this.state;
        const {news} = this.state;
        const newsList = news.length
        ?
            news.map((newsItem,index)=>(
                <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`detail/${newsItem.uniquekey}`}>
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{newsItem.realtype}</span>
                                    <div className="m_article_time">{newsItem.date}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
        :
            '没有加载到任何新闻';

        return(
            <div class="topNewsList">
                <Row>
                    <Col span={24}>
                        <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)} style={{'textAlign':'center'}} className="your-own-class-if-you-want">
                            <span className="genericon genericon-next"></span>
                            <div>
                                {newsList}
                            </div>
                        </ReactPullToRefresh>
                    </Col>
                </Row>
            </div>
        )
    }
}