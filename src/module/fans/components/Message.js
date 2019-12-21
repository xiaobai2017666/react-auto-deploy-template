import React, { Component } from 'react';
import axios from 'axios';

import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

export default class MessageManager extends Component {
    state = {
        messages: []
    }

    componentDidMount() {
        axios({
            url: `${PREFIX}/getMessages`
        }).then((res) => {
            this.setState({
                messages: res.data
            })
        })
    }

    render() {
        const columns = [
            {
                title: '留言',
                dataIndex: 'text',
                key: 'text',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: '100px',
                align: 'right',
            }
        ]

        return (
            <div>
                <Button type="primary" style={{'margin-bottom':'20px'}}>
                    <Link to="/addmessage">留言</Link>
                </Button>
                <Table columns={columns} dataSource={this.state.messages}/>
            </div>

        )
    }
}