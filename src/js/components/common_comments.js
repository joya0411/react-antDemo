import React from 'react';
import { Row, Col,Form,Input,Button,Card,notification} from 'antd';
const FormItem = Form.Item;

class CommentComments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments:''
        };
    }
    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        };
        var fetchUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey;

        fetch(fetchUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                comments:json
            });
        });
    }
    handlerSubmit(e){
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        var myFetchOptions = {
            method:'GET'
        };
        var fetchUrl =  'http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid='+ localStorage.userid +'&uniquekey='+ this.props.uniquekey +'&commnet='+ formData.remark;
        fetch(fetchUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.componentDidMount();
            this.props.form.setFieldsValue({
                remark:''
            });
        });

    };
    addUserCollection(){
        var myFetchOptions = {
            method:'GET'
        };
        var fetchUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid='+ localStorage.userid +'&uniquekey='+ this.props.uniquekey;
        fetch(fetchUrl,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            //收藏成功以后进行一下全局的提醒
            notification.success({
                message:'React News',
                description:'收藏此文章成功'
            });
        });

    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ? 
            comments.map((comment,index)=>(
                <Card key={index} title={comment.UserName} extra={<a href="#">发表于 {comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
        :
            'bbb';
        return(
            <div class="comment">
                <Row>
                    <Col>
                        {commentList}
                        <hr/>
                        <Form onSubmit={this.handlerSubmit.bind(this)}>
                            <FormItem label="您的评论">
                            {getFieldDecorator('remark', {
                                initialValue:'写点东西吧',
                            })(
                                <Input type="textarea" placeholder='随便写' />
                            )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">
                                提交评论
                            </Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>
                                收藏该文章
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CommentComments = Form.create()(CommentComments);

