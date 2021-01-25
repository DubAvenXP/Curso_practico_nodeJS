const controller = require('./controller');
const config = require('../../../config');

let store;
if (config.remoteDb === true) {
    const store = require('../../../store/remote-mysql');
} else {
    store = require('../../../store/mysql');
}

module.exports = controller(store);
