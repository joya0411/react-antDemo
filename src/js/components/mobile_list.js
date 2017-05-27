import React from 'react';
import {Row,Col} from 'antd';
import Tloader from 'react-touch-loader';

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
            count:10,
            initializing:1, //并不显示进度条
            hasMore:true, //显示加载更多
            autoLoadMore:true, //滚动到底部自动加载更多
            refreshedAt:Date.now()
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
    }
    //点击加载更多，执行的函数
    handleLoadMore(resolve){
        // setTimeout(()=>{
            var count = this.state.count;

            this.setState({
                count: count+10,
                hasMore : count>0 && count<50
            });

            var myFetchOptions = {
                method:'GET'
            };
            var fetchUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+ this.props.type +'&count='+ this.state.count;

            fetch(fetchUrl,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({
                    news: json
                })
            });

            //结束关闭loading
            resolve && resolve();

        // },2000);
        
    };
    //上拉刷新
    handleRefresh(resolve,reject){
        setTimeout(()=>{
            this.setState({
                count:10,
                hasMore:true,
                refreshedAt:Date.now()
            });

            var myFetchOptions = {
                method:'GET'
            };
            var fetchUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=yule&count='+ this.state.count;

            fetch(fetchUrl,myFetchOptions)
            .then(response=>response.json())
            .then(json=>{
                this.setState({
                    news: json
                })
            });

            resolve();
        });
    };
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                hasMore:true,
                initializing:2 //进度结束
            });
        },2e3);

        this.autoRefresh();

    };
    //自动刷新
    autoRefresh(){
        let timeoutId = null;
        let tloaderBtn = document.getElementsByClassName('tloader-btn')[0];
        window.addEventListener('scroll',function(){
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>{
                let winHeight = window.screen.height;
                let tloaderHeight = tloaderBtn.getBoundingClientRect().top;
                if ( tloaderHeight && tloaderHeight<winHeight ) {
                    this.handleLoadMore();
                }
            },50);
        }.bind(this),false);
    }
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
                        <Tloader className="tloader" onRefresh={this.handleRefresh.bind(this)} onLoadMore={this.handleLoadMore.bind(this)} initializing={initializing} hasMore={hasMore} autoLoadMore={autoLoadMore}>
                            {newsList}
                        </Tloader>
                    </Col>
                </Row>
            </div>
        )
    }
}