import React, { Component } from 'react';
import Form from '@/Form/index';

import { Card } from 'antd';

export default class Register extends Component {
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
                },
                _password: {
                    fit: 'input',
                    name: '确认密码',
                },
                phonenumber: {
                    fit: 'input',
                    name: '手机号',
                }
            },
            btns: [
                '注册',
                '重置',
            ],
            source: {
                url: `${PREFIX}/login`,
            }
        }
        return (
            <Card
                title="注册">
                <div class="form-container">
                    <Form { ...CONFIG }/>
                </div>     
            </Card>
        )
    }
}