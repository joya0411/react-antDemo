import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { 
    Menu, 
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Modal
    
} from 'antd';

import {
    IndexRoute,
    Router,
    Route,
    hashHistory,
    Link
} from 'react-router';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            current:'top',
            modalVisible:false, //modal 隐藏
            action:'login', //按钮用来做登录还是注册？
            hasLogined:false , //是否已经登录？
            userNickName:'' , //昵称
            userid:0
        };
    }
    componentWillMount(){
        if (!localStorage.userid=='') {
            this.setState({
                hasLogined:true,
                userNickName:localStorage.userNickName,
                userid:localStorage.userid
            });
        }
    }
    handleClick(e){
        this.setState({
            current:e.key
        });
        //点击注册显示 modal 框
        if (e.key=="register") {
            this.setModalVisible(true);
        }
    };
    setModalVisible(value){
        this.setState({
            modalVisible:value
        });
    };
    handleSubmit(e){      
        e.preventDefault();
        //提交数据
        var myFetchOptions = {
            method:'GET'
        };
        var formData = this.props.form.getFieldsValue();
        var fetchUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action='+ this.state.action +'&username='+ formData.userName +'&password='+ formData.password +'&r_username='+ formData.r_userName +'&r_password='+ formData.r_password +'&r_confirmPassword=' + formData.r_confirmPassword;

        fetch(fetchUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                userNickName:json.NickUserName,
                userid:json.UserId
            });

            localStorage.userid = json.UserId;
            localStorage.userNickName = json.NickUserName;

        });
        if ( this.state.action == 'login'){
            this.setState({
                hasLogined : true
            });
        }
        message.success('请求成功！');
        this.setModalVisible(false);
    };
    handleChange(key){
        if (key==1){
            //登录
            this.setState({
                action:'login'
            });
        } else if (key==2){
            //注册
            this.setState({
                action:'register'
            });
        }
    };
    logout(){
        this.setState({
            hasLogined:false
        });
        localStorage.userid = '';
        localStorage.userNickName = '';
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 4,
                },
            },
        };

        var userShow = this.state.hasLogined ? 
            <Menu.Item key="logout" class="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link to={`usercenter`}>
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="Default" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
        :
            <Menu.Item key="register" class="register">
                <Icon type="user"/>登录/注册
            </Menu.Item>
        ;

        return (
          <header>
              <Row>
                  <Col span={2}></Col>
                  <Col span={4}>
                        <a href="/" class="logo">
                            <img src="../../images/fox_News.png" alt="fox_News logo" />
                            <span>ReactNews</span>
                        </a>
                  </Col>
                  <Col span={16}>
                        <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
                            <Tabs type="card" onChange={this.handleChange.bind(this)}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="帐户" {...formItemLayout}>
                                            {getFieldDecorator('userName')(
                                               <Input type="text" placeholder="请输入您的帐号" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码" {...formItemLayout}>
                                            {getFieldDecorator('password')(
                                                <Input type="password" placeholder="请输入您的密码" />
                                            )}
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit">
                                                登录
                                            </Button>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="帐户" {...formItemLayout}>
                                            {getFieldDecorator('r_userName')(
                                               <Input type="text" placeholder="请输入您的帐号" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码" {...formItemLayout}>
                                            {getFieldDecorator('r_password')(
                                                <Input type="password" placeholder="请输入您的密码" />
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码" {...formItemLayout}>
                                            {getFieldDecorator('r_confirmPassword')(
                                                <Input type="password" placeholder="请再次输入您的密码" />
                                            )}
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout}>
                                            <Button type="primary" htmlType="submit">
                                                注册
                                            </Button>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                  </Col>
                  <Col span={2}></Col>
              </Row>
          </header>
        );
    };
}

export default  PCHeader = Form.create()(PCHeader);