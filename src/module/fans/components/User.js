import React, { Component } from 'react';
import axios from 'axios';
import Form from '@/Form/Form';

import { Table, Button, Modal } from 'antd';

export default class UserManager extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios({
            url: `${PREFIX}/getUsers`
        }).then((res) => {
            this.setState({
                users: res.data
            })
        })
    }

    onEditHandle = (data, id) => {
        const modal = Modal.info();
        
        const CONFIG = {
            feilds: {
                username: {
                    fit: 'input',
                    name: '用户名',
                    rules: [
                        (val) => {
                            if(val === '') return '订单名称不能为空！'
                        }
                    ],
                },
                password: {
                    fit: 'input',
                    name: '密码',
                },
            },
            btns: [
                '确定',
                '重置',
                <Button
                    onClick={()=>{modal.destroy()}}>取消</Button>,
            ],
            source: {
                url: `${PREFIX}/editUser/${id}`,
            },
            initValues: { ...data }
        }

        modal.update({
            title: '编辑用户',
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

    onDeleteHandle = (index) => {
        const current = [ ...this.state.users ];
        current.splice(index, 1);
        this.setState({
            users: current
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '密码',
                dataIndex: 'password'
            },
            {
                title: '操作',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button
                                style={{
                                    marginRright: '12px'
                                }}
                                onClick={() => {this.onEditHandle(record, record.id)}}>编辑</Button>
                            <Button
                                onClick={() => {this.onDeleteHandle(index)}}>删除</Button>
                        </div>


                    )
                },
            }
        ]

        return (
            <div>
                <Table columns={columns} dataSource={this.state.users}/>
            </div>
        )
    }
}