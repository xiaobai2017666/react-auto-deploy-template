import React, { Component } from 'react';
import Form from '@/Form/Form';

import MyInput from './MyInput';
import MyTextarea from './MyTextarea';
import { Card, Button } from 'antd';

Form.register({
    input: MyInput,
    textarea: MyTextarea,
});

export default class Home extends Component {
    state = {
        isLogin: false,
    }
    
    componentDidMount() {
        const username = localStorage.getItem('username');
        if(username) this.setState({isLogin: true});
    }

    render() {
        const CONFIG = {
            feilds: {
                username: {
                    fit: 'input',
                    name: '用户名',
                    rules: [
                        (val) => {
                            if(val === '') return '用户名不能为空！'
                        }
                    ]
                },
                password: {
                    fit: 'input',
                    name: '密码',
                    defaultValue:'123456'
                },
                password2: {
                    fit: 'input',
                    name: '密码',
                    defaultValue:'123456'
                },
                password3: {
                    fit: 'input',
                    name: '密码',
                    defaultValue:'123456'
                }
            },
            btns: [
                '登录',
                '重置',
            ],
            source: {
                url: `https://xyapi.xiaoniangao.cn/mock/304/api/test/test`,
                method: 'GET',
                afterAjax: (res) => {
                    if(res.data !== 'failed') {
                        localStorage.setItem('username', res.data);
                        this.setState({
                            isLogin: true,
                        })
                    }
                }
            },
            layout: 'vertical',
        }

        const { isLogin } = this.state;
        const username = localStorage.getItem('username');

        if(this.state.isLogin) {
            return (
                <Card title={`欢迎您，${username}!`}>
                    <Button onClick={() => {this.setState({isLogin: false});localStorage.removeItem('username');}}>注销</Button>
                </Card>
            )
        }
        return (
            <Card
                title="欢迎，请登录">
                <div className="form-container">
                    <Form { ...CONFIG }/>
                </div>     
            </Card>
        )
    }
}