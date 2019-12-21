import React, { Component } from 'react';
import axios from 'axios';
import Form from '@/Form/index';

import { Table, Button, Modal } from 'antd';

export default class OrderManager extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        axios({
            url: `${PREFIX}/getOrders`
        }).then((res) => {
            this.setState({
                orders: res.data
            })
        })
    }

    onAddHandle = () => {
        const modal = Modal.info();
        
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
                '确定',
                '重置',
                <Button
                    onClick={()=>{modal.destroy()}}>取消</Button>,
            ],
            source: {
                url: `${PREFIX}/login`,
            }
        }

        modal.update({
            title: '新增订单',
            icon: false,
            content: (
                <Form { ...CONFIG }/>
            ),
            okButtonProps: {
                style: {
                    'display': 'none'
                }
            }
        })
    }



    render() {
        const columns = [
            {
                title: '订单号',
                dataIndex: 'text',
                key: 'text',
            },
            {
                title: '订单',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '单价',
                dataIndex: 'text',
                key: 'text',
            },
            {
                title: '数量',
                dataIndex: 'text',
                key: 'text',
            },
            {
                title: '总计',
                dataIndex: 'text',
                key: 'text',
            },
            {
                title: '发起人',
                dataIndex: 'text',
                key: 'text',
            },
        ]

        return (
            <div>
                <Button
                    type="primary"
                    style={{'margin-bottom':'20px'}}
                    onClick={this.onAddHandle}>
                    新增订单
                </Button>
                <Table columns={columns} dataSource={this.state.orders}/>
            </div>

        )
    }
}