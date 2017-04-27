import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Row,Col,Tabs,Upload,Icon,Modal,Card,BackTop} from 'antd';
const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            usercollection:'',
            userComments:'',
            previewVisible:false,
            previewImage:''
        };
    };
    handleCancel(){
        this.setState({
            previewVisible:false
        });
    };
    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        };
        var fetchCollectionUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid='+ localStorage.userid ; //我的收藏列表
        var fetchCommentUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid='+ localStorage.userid; //我的评论列表

        fetch(fetchCollectionUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                usercollection:json
            });
        });

        fetch(fetchCommentUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                userComments:json
            });
        });


    };
    render(){
        const props = {
            action:'http://newsapi.gugujiankong.com/Handler.ashx',
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            listType:'picture-card',
            defaultFileList:[
                {
                    uid:-1,
                    name:'xxx.png',
                    state:'done',
                    url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                }
            ],
            onPreview:(file)=>{
                this.setState({
                    previewVisible:true,
                    previewImage:file.url || file.thumbUrl
                });
            },
            onRemove:function(){
                console.log('onRemove');
            }
        };

        const {usercollection,userComments} = this.state;
        const usercollectionList = usercollection.length ? 
            usercollection.map((uc,index)=>(
                <Card key={index} title={uc.uniquekey} extra={<a href={`/#/detail/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
        : '您还没有收藏任何的新闻，快去收藏一些新闻吧！';
        const userCommentsList = userComments.length?
            userComments.map((item,index)=>(
                <Card key={index} title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`} extra={<a href={`/#/detail/${item.uniquekey}`}>查看</a>}>
                    <p>{item.Comments}</p>
                </Card>
            ))
        : '您还没有发表过任何评论。';

        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {userCommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix" style={{'marginTop':'8px'}}>
                                    <Upload {...props}>
                                        <div>
                                            <Icon type="plus"/>
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img src={this.state.previewImage} style={{width:'100%'}} alt=""/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <BackTop/>
                <PCFooter/>
            </div>
        )

    }
}