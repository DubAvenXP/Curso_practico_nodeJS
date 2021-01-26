const controller = require('./controller');
const config = require('../../../config');


let store;
let cache;

// if (config.remoteDb === false) {
//     store = require('../../../store/remote-mysql');
//     cache = require('../../../store/remote-cache');
// } else {
// }
store = require('../../../store/mysql');
store = require('../../../store/redis');

module.exports = controller(store, cache);
