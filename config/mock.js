const path = require('path');
const glob = require('glob');

const ROOT_PATH = path.resolve(__dirname, '../');
const UTILS = require('./utils');

module.exports = function(app) {
    const mockConfigFile = glob.sync(path.resolve(ROOT_PATH, './mock/**/*.js'));

    mockConfigFile.forEach((item) => {
        const config = require(item);
        if(config.length > 0) {
            config.forEach((item) => {
                UTILS.isUndefined({
                    type: item.type,
                    url: item.url,
                    data: item.data
                });

                app[item.type.toLowerCase()](item.url,(req,res) => {
                    res.send(item.data);
                });
            })
        }
    });
}