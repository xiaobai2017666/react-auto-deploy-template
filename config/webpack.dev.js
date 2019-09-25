const merge = require('webpack-merge');
const webpack =require('webpack');
const path = require('path');
const express = require('express');

const ROOT_PATH = path.resolve(__dirname, '../');
const UTILS = require('./utils');
const MOCK = require('./mock');
const PROXY = require('./proxy');
const config = require('./webpack.base');

const DEFAULT_PORT = 6789;  //port默认值

module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: path.join(ROOT_PATH, 'dist'),
        port: UTILS.freePortFinder(DEFAULT_PORT),
        hot: true,
        before(app,server) {
            if(UTILS.isParam('mock',process.argv)) {
                MOCK(app);
            }else {
                PROXY(app);
            }
        },
        // bonjour: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'BASEURL': JSON.stringify('http://localhost:9000'),
        }),
    ]
});