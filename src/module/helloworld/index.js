import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

const root = document.getElementById('main');

class Helloworld extends React.Component {
    constructor() {
        super();
        this.state = {
            msg: "aaaa"
        }
    }

    componentWillMount() {
        Axios({
            url: '/api/test',
            method: 'GET'
        }).then((res) => {
            this.setState({
                msg: res.data.data
            });
        });
    }

    render() {
        return (
            <h1>{this.state.msg}</h1>
        );
    }
}

ReactDOM.render(
    (
        <Helloworld/>
    ),
    root
);