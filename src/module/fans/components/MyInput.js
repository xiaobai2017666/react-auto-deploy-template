import React, { Component } from 'react';

import { Input } from 'antd';

export default class MyInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        };
    }

    getValue = () => {
        return this.state.value;
    }

    setValue = (val) => {
        this.setState({
            value: val
        });
    }

    onChangeHandle = (e) => {
        const { 
            onChange,
        } = this.props;

        this.setState({
            value: e.target.value
        },() => {
            onChange && onChange(e);
        });
    }

    render() {
        const { 
            onChange,
            ...props
        } = this.props;

        return (
            <Input
                { ...props }
                value={this.state.value}
                onChange={this.onChangeHandle} />
        )
    }
}