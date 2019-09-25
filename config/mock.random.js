

//入口
function entry(data) {
    if(isFunction(data)) new TypeError('不支持的数据类型: function');
    if(!isObject(data)) return data;

    Reflect.ownKeys(data).map((item) => {

        if(isRule(item)) {
            const temp = item.split('|');

        }
    });

    return data;
}

function isObject(obj) {  //判断非函数对象
    return (typeof obj === 'object')
}

function isFunction() {
    return (typeof obj === 'function')
}

function isEmpty(obj) {
    return (obj === null || obj === undefined)
}

function isRule(str) {
    const reg = /^[^\|]*\|[^\|]$/;
    return !!str.match(reg);
}
function generate(data) {
    Reflect.ownKeys(data).map((item) => {

        if(isRule(item)) {
            const temp = item.split('|');

        }
    })
}

function _random(args,data) {

}