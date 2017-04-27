import React from 'react';
import {Tabs,Card} from 'antd';
import {
    IndexRoute,
    Router,
    Route,
    hashHistory,
    Link
} from 'react-router';

export default class PCNewsBlock extends React.Component{
    constructor(){
        super();
        this.state = {
            news:''
        }
    }
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
    render(){
        const {news} = this.state;
        const newsList = news.length
        ?
            news.map((newsItem,index)=>(
                <li key={index}>
                    <Link to={`detail/${newsItem.uniquekey}`}>
                        {newsItem.title}
                    </Link>
                </li>
            ))
        :
            '没有加载到任何新闻';

        return(
            <div class="topNewsList">
                <Card bodyStyle={{padding:'16px'}}>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }
}