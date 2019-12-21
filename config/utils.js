const path = require('path');
const glob = require('glob');
const net = require('net');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const MODULE_PATH = path.resolve(__dirname, '../src/module');

function spaceEscape(path) {  //此函数为了exec类似函数执行代码遇到有空格的文件path的一个处理
    return path.replace(/(\s)/,'\\$1');
}

function getFileMap() {
    const entries = glob.sync(path.resolve(MODULE_PATH, './*/index.js'));

    const map = {};

    const reg=/(?<=(\\|\/))[^\\/]+(?=((\\|\/)index\.js))/g;
    entries.forEach((item) => {
        const key=item.match(reg)[0];

        map[key]=item;
    });

    return map;
}

const filesMap = getFileMap();  //模块名-模块入口路径的映射


module.exports = {
    getEntries() {
        return filesMap;
    },

    getHtmlPlugins() {
        const results = [];

        Reflect.ownKeys(filesMap).forEach((item) => {
            //plugin配置默认值
            let chunks = [item,'modules','lib'];
            let template = path.resolve(ROOT_PATH, './src/index.html');
            let filename = `${item}/index.html`;


            let itemHtml = glob.sync(path.resolve(MODULE_PATH, `./${item}/index.html`));
            if(itemHtml.length === 1) {  //看看模块下是否有html模版
                template = itemHtml[0];
            }

            let plugin = new HtmlWebpackPlugin({
                template,
                filename,
                chunks
            });

            results.push(plugin);
        });

        return results;
    },

    isParam(param,args) {
        return !!~args.indexOf(`--${param}`);
    },

    //参数缺失验证
    isUndefined(params) { //pararm Object<key:value>
        Reflect.ownKeys(params).forEach((item) => {
            if(!params[item]) throw new Error(`${item} is undefined !`);
        });
    },

    debounce(fn,delay) {
        let timer = null;
        return function() {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer=setTimeout(() => {
                fn();
                timer = null;
            },delay);
        }
    },

    PortDetect(devServer) {
        const port = devServer.port;

        return new Promise((resolve) => {
            const examiner = net.createServer().on('listening',() => {
                devServer.port = examiner.address().port;
                examiner.close();
                console.log(`devServer将启动于端口 ${devServer.port}！`);
                resolve(devServer.port);
            }).on('error',(err) => {
                console.log(`port ${port} 已被占用！\n将随机寻找空闲端口。`);
                examiner.listen();
            });
            
            examiner.listen(port);
        })
    }
}