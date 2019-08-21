const proxy = require('http-proxy-middleware');

//接口地址配置
const scoketConfig = {
    // index: {

    // },
    test: {
        host: 'http://localhost:3000',
        uri: '/api'
    },
    
}

module.exports = function(app) {
    proxyOption = {
        target: scoketConfig.test.host,
        changeOrigoin:true
    };

    app.use(scoketConfig.test.uri, proxy(proxyOption));
}