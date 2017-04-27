import React from 'react';
import {Tabs,Card} from 'antd';
import {
    IndexRoute,
    Router,
    Route,
    hashHistory,
    Link
} from 'react-router';

export default class PCNewsImageBlock extends React.Component{
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
        var styleImage = {
            display:'block',
            padding:'5px',
            boxSizing:'border-box',
            width:'100%'
        };
        var styleH3 = {
            display:'block',
            overflow:'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap'
        }
        const {news} = this.state;
        const newsList = news.length
        ?
            news.map((newsItem,index)=>(
                <div key={index} class="imageblock" style={{width:this.props.imageWidth}}>
                    <Link to={`detail/${newsItem.uniquekey}`} target="_blank">
                        <div className="custom-image">
                            <img style={styleImage} src={newsItem.thumbnail_pic_s} alt=""/>
                        </div>
                        <div className="custom-card">
                            <h3 style={styleH3}>{newsItem.title}</h3>
                            <p>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
        :
            '没有加载到任何新闻';

        return(
            <div class="topNewsList">
                <Card title={this.props.title} bordered={true} bodyStyle={{padding:'10px'}}>
                    {newsList}
                </Card>
            </div>
        )
    }
}