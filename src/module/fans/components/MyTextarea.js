import React, { Component } from 'react';

import { Input } from 'antd';

const { TextArea } = Input;

export default class MyTextArea extends Component {
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

        console.log(props);

        return (
            <TextArea
                { ...props }
                value={this.state.value}
                onChange={this.onChangeHandle} />
        )
    }
}