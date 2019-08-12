const path = require('path');
var glob = require('glob');

var MODULE_PATH = path.resolve(__dirname, '../src/module');

module.exports = {
    getEntries() {
        var entryJs = glob.sync(path.resolve(MODULE_PATH, './*/*.js'));

        console.log(entryJs);
    }
}

module.exports.getEntries();