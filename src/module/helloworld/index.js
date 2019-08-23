import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

const root = document.getElementById('main');

class Helloworld extends React.Component {
    constructor() {
        super();
        this.state = {
            msg: ""
        }
    }

    componentWillMount() {
        Axios({
            url: '/api/test',
            method: 'GET'
        }).then((res) => {
            this.setState({
                msg: res.data.msg
            });
        });
    }

    render() {
        return (
            <h1>{this.state.msg + ENV}</h1>
        );
    }
}

ReactDOM.render(
    (
        <Helloworld/>
    ),
    root
);