import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Row,Col,BackTop} from 'antd';
import CommentComments from './common_comments';

export default class MobileNewsDetails extends React.Component{
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
            <div id="mobileDetailsContainer">
                <MobileHeader/>
                <div class="ucmobileList pd16">
                    <Row>
                        <Col span={24}>
                            <div style={{'paddingTop':'16px'}} dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <CommentComments uniquekey={this.props.params.uniquekey}/>
                        </Col>
                    </Row>
                </div>
                <BackTop/>
                <MobileFooter/>
            </div>
        )
    }
}