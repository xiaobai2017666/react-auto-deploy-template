const path = require('path');
const glob = require('glob');
const fs = require('fs');

const ROOT_PATH = path.resolve(__dirname, '../');
const UTILS = require('./utils');

const mockFiles = glob.sync(path.resolve(ROOT_PATH, './mock/**/*.js'));

function _mock(app,item) {
    const config = require(item);
    if(config.length > 0) {
        config.forEach((item) => {
            app[item.type.toLowerCase()](`/api${item.url}`,(req,res) => {
                if(typeof item.data === 'function') {
                    if(item.type.toLowerCase() === 'get') {
                        res.send(item.data(req.query));
                    }else if(item.type.toLowerCase() === 'post') {
                        res.send(item.data(req.body));
                    }else {
                        res.send();
                    }
                }else {
                    res.send(item.data);
                }
            });
        })
    }
}

function watchFile(url,cb) {
    fs.watchFile(url,(cur,pre) => {
        cb();
    })
}

const mockToDebounce = function(app,item) {
    return function() {
        console.log('mock数据正在修改，请稍后...');
        
        delete require.cache[require.resolve(item)];  //清除缓存
        const config = require(item);

        if(config.length > 0) {
            config.forEach((mockItem) => {
                UTILS.isUndefined({
                    type: mockItem.type,
                    url: mockItem.url,
                    data: (Object.prototype.toString.call() === '[object Function]' ? mockItem.data() : mockItem.data)
                });

                app._router.stack.forEach((routeItem,index) => {
                    if(routeItem.route && routeItem.route.path === `/api${mockItem.url}`) {
                        app._router.stack.splice(index,1);
                    }
                });
    
                app[mockItem.type.toLowerCase()](`/api${mockItem.url}`,(req,res) => {
                    if(typeof mockItem.data === 'function') {
                        if(mockItem.type.toLowerCase() === 'get') {
                            res.send(mockItem.data(req.query));
                        }else if(mockItem.type.toLowerCase() === 'post') {
                            res.send(mockItem.data(req.body));
                        }else {
                            res.send();
                        }
                    }else {
                        res.send(mockItem.data);
                    }
                    
                });
            })
        }

        console.log('mock数据已修改成功～');
    }
}

function mock(app,configs) {
    configs.forEach((item) => {
        _mock(app,item);

        const cb = UTILS.debounce(mockToDebounce(app,item),600);
        watchFile(item,cb);
    })
}

function init(app) {
    mock(app,mockFiles);
}

module.exports = function(app) {
    init(app);
}