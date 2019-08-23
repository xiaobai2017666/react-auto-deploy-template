const proxy = require('http-proxy-middleware');
const socketConfig = require('./socket');

const config = {
    host,
    path
} = { ...socketConfig.mock }  //通过这里修改

module.exports = function(app) {
    proxyOption = {
        target: config.host,
        changeOrigin: true
    };

    app.use(config.path, proxy(proxyOption));
}