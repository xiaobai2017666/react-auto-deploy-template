import React, { Component } from 'react';
import axios from 'axios';
import Form from '@/Form/Form';

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

    onEditHandle = (data, orderNumber) => {
        const modal = Modal.info();
        
        const CONFIG = {
            feilds: {
                orderName: {
                    fit: 'input',
                    name: '订单名称',
                    rules: [
                        (val) => {
                            if(val === '') return '订单名称不能为空！'
                        }
                    ],
                },
                type: {
                    fit: 'input',
                    name: '种类',
                },
                onePrice: {
                    fit: 'input',
                    name: '单价',
                    rules: [
                        (val) => {
                            if(val === '') return '单价不能为空！'
                        }
                    ],
                },
                num: {
                    fit: 'input',
                    name: '数量',
                    rules: [
                        (val) => {
                            if(val === '') return '数量不能为空！'
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
                url: `${PREFIX}/editOrder/${orderNumber}`,
            },
            initValues: { ...data }
        }

        modal.update({
            title: '编辑订单',
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
                ordername: {
                    fit: 'input',
                    name: '订单名称',
                    rules: [
                        (val) => {
                            if(val === '') return '订单名称不能为空！'
                        }
                    ],
                },
                type: {
                    fit: 'input',
                    name: '种类',
                },
                oneprice: {
                    fit: 'input',
                    name: '单价',
                    rules: [
                        (val) => {
                            if(val === '') return '单价不能为空！'
                        }
                    ],
                },
                num: {
                    fit: 'input',
                    name: '数量',
                    rules: [
                        (val) => {
                            if(val === '') return '数量不能为空！'
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
                url: `${PREFIX}/addOrder`,
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

    onDeleteHandle = (index) => {
        const current = [ ...this.state.orders ];
        current.splice(index, 1);
        this.setState({
            orders: current
        })
    }

    render() {
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderNumber',
            },
            {
                title: '订单',
                dataIndex: 'orderName',
            },
            {
                title: '种类',
                dataIndex: 'type',
            },
            {
                title: '单价',
                dataIndex: 'onePrice',
            },
            {
                title: '数量',
                dataIndex: 'num',
            },
            {
                title: '总计',
                render(text, record) {
                    return record.onePrice * record.num;
                }
            },
            {
                title: '发起人',
                dataIndex: 'person',
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
                                onClick={() => {this.onEditHandle(record, record.orderNumber)}}>编辑</Button>
                            <Button
                                onClick={() => {this.onDeleteHandle(index)}}>删除</Button>
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
                    新增订单
                </Button>
                <Table columns={columns} dataSource={this.state.orders}/>
            </div>

        )
    }
}