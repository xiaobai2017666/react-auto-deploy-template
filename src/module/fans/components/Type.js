import React, { Component } from 'react';
import axios from 'axios';
import Form from '@/Form/Form';

import { Table, Button, Modal } from 'antd';

export default class TypeManager extends Component {
    state = {
        types: []
    }

    componentDidMount() {
        axios({
            url: `${PREFIX}/getTypes`
        }).then((res) => {
            this.setState({
                types: res.data
            })
        })
    }

    onEditHandle = (data, id) => {
        const modal = Modal.info();
        
        const CONFIG = {
            feilds: {
                typeName: {
                    fit: 'input',
                    name: '种类名称',
                    rules: [
                        (val) => {
                            if(val === '') return '种类名称不能为空！'
                        }
                    ],
                },
            },
            btns: [
                '确定',
                '重置',
                <Button
                    onClick={()=>{modal.destroy()}}>取消</Button>,
            ],
            source: {
                url: `${PREFIX}/editType/${id}`,
            },
            initValues: { ...data }
        }

        modal.update({
            title: '编辑种类',
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

    onAddHandle = () => {
        const modal = Modal.info();
        
        const CONFIG = {
            feilds: {
                typeName: {
                    fit: 'input',
                    name: '种类名称',
                    rules: [
                        (val) => {
                            if(val === '') return '种类名称不能为空！'
                        }
                    ],
                },
            },
            btns: [
                '确定',
                '重置',
                <Button
                    onClick={()=>{modal.destroy()}}>取消</Button>,
            ],
            source: {
                url: `${PREFIX}/addType`,
            }
        }

        modal.update({
            title: '新增种类',
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
        const current = [ ...this.state.types ];
        current.splice(index, 1);
        this.setState({
            types: current
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '种类名称',
                dataIndex: 'typeName',
            },
            {
                title: '操作',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button
                                style={{
                                    'marginRright': '12px'
                                }}
                                onClick={() => {this.onEditHandle(record, record.id)}}>编辑</Button>
                            <Button
                                onClick={() => {this.onDeleteHandle(record.id)}}>删除</Button>
                        </div>


                    )
                },
            }
        ]

        return (
            <div>
                <Button
                    type="primary"
                    style={{'margin-bottom':'20px'}}
                    onClick={this.onAddHandle}>
                    新增种类
                </Button>
                <Table columns={columns} dataSource={this.state.types}/>
            </div>

        )
    }
}