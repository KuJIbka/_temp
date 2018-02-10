const config = require(global.src + 'config.js');

exports.urlSign = config.host + '/sign';
exports.urlExchange = config.host + '/in/#/operations/exchange';