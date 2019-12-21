import React, { Component } from 'react';
import Form from '@/Form/index';

import { Card } from 'antd';

export default class AddMessage extends Component {
    render() {
        const CONFIG = {
            feilds: {
                username: {
                    fit: 'textarea',
                    name: '信息',
                    rows: 4,
                    rules: [
                        (val) => {
                            if(val === '') return '留言信息不能为空！'
                        }
                    ]
                },
            },
            btns: [
                '留言',
                '重置',
            ],
            source: {
                url: `${PREFIX}/addmessage`,
                method: 'post',
            }
        }
        
        return (
            <Card
                title="留言">
                <div class="form-container">
                    <Form { ...CONFIG }/>
                </div>     
            </Card>
        )
    }
}