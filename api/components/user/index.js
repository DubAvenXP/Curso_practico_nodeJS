const controller = require('./controller');
const config = require('../../../config');

let store, cache;
if (config.remoteDb === true) {
    store = require('../../../store/remote-mysql');
    cache = require('../../../store/remote-cache');
} else {
    store = require('../../../store/mysql');
    cache = require('../../../store/redis');
}

module.exports = controller(store, cache);