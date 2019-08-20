const path = require('path');
const glob = require('glob');

const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = function(app) {
    const mockConfigFile = glob.sync(path.resolve(ROOT_PATH, './mock/**/*.js'));

    mockConfigFile.forEach((item) => {
        const config = require(item);
        if(config.length > 0) {
            config.forEach((item) => {
                app[item.type.toLowerCase()](item.url,(req,res) => {
                    res.send(item.data);
                });
            })
        }
    });
}