import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

const root = document.getElementById('main');

Axios({
    url: 'http://localhost:9000/test',
    method: 'GET'
}).then((res) => {
    console.log(res.data);
})

ReactDOM.render(
    (
        <div>hello world</div>
    ),
    root
);