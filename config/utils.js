const path = require('path');
let glob = require('glob');

let MODULE_PATH = path.resolve(__dirname, '../src/module');

let entries = glob.sync(path.resolve(MODULE_PATH, './*/index.js'));

module.exports = {
    getEntries() {
        let map = {};

        entries.forEach((item) => {
            const reg=/(?<=(\\|\/))[^\\/]+(?=((\\|\/)index\.js))/g;
            const key=item.match(reg)[0];

            map[key]=item;
        })

        console.log(map);

        return map;
    }

}

module.exports.getEntries();