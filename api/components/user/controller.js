const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user'


module.exports =  (injectedStore) => {
    let store = injectedStore;

    if (!store) store = require('../../../store/dummy');
    
    async function list() {
        return await store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, 'id', id, 'string')
    }

    async function post(data) {
        const user = {
            id: nanoid(),
            name: data.name,
            username: data.username,
        }

        if (data.password || data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password,
            })
        }

        return await store.upsert(TABLA, user);
    }

    function update(id, data) {
        store.update(TABLA, id, data)
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