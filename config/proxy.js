console.log(process.env.WEBPACK_ENV);

module.exports = (function(env) {
    const PREFIX = {
        mock: 'http://localhost:9000',
        // dev: 'dev',
        // pro: 'pro',
    }

    return PREFIX[env];
})(process.env.WEBPACK_ENV);  //待定参数