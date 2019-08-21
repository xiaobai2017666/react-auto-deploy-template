const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const MODULE_PATH = path.resolve(__dirname, '../src/module');

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
    }
}