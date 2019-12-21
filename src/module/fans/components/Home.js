import React, { Component } from 'react';
import Form from '@/Form/index';

import MyInput from './MyInput';
import MyTextarea from './MyTextarea';
import { Card } from 'antd';

Form.register({
    input: MyInput,
    textarea: MyTextarea,

})

export default class Home extends Component {
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
                }
            },
            btns: [
                '登录',
                '重置',
            ],
            source: {
                url: `${PREFIX}/login`,
            }
        }
        return (
            <Card
                title="欢迎，请登录">
                <div class="form-container">
                    <Form { ...CONFIG }/>
                </div>     
            </Card>
        )
    }
}