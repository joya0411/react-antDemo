import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Row,Col,BackTop} from 'antd';
import CommentComments from './common_comments';
import PCNewsImageBlock from './pc_news_image_block';

export default class PCNewsDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            newsItem : ''
        };
    }
    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        };
        var fetchUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+ this.props.params.uniquekey;

        fetch(fetchUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                newsItem:json
            });
            document.title = this.state.newsItem.title + ' - React News | React 驱动的新闻平台';
        });
    }
    createMarkup(){
        return {__html:this.state.newsItem.pagecontent};
    }
    render(){
        return(
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14}>
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommentComments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock type="keji" count="20" imageWidth="50%"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <BackTop/>
                <PCFooter/>
            </div>
        )
    }
}