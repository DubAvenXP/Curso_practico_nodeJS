const { nanoid } = require('nanoid');

const TABLA = 'user'


module.exports =  (injectedStore) => {
    let store = injectedStore;

    if (!store) store = require('../../../store/dummy');
    
    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id)
    }

    function post(data) {
        const user = {
            id: nanoid(),
            name: data.name
        }

        store.upsert(TABLA, user);
    }

    function update(id, name) {
        store.updateName(TABLA, id, name)
    }

    function remove(id) {
        store.remove(TABLA, id)
    }

    return {
        list,
        get,
        post,
        update,
        remove
    }
}