const web3 = require('web3');

module.exports = {
    toAsciiTrimmed: (hex) => {
        return web3.utils.hexToAscii(hex).replace(/\u0000/g, '');
    },
};