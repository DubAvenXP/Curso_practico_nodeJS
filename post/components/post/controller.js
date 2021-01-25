const TABLA = 'post';
const { nanoid } = require('nanoid');


module.exports = function (injectedStore) {
    
    let store = injectedStore;
    if (!store) store = require('../../../store/dummy');
    
    async function list() {
        return await store.list(TABLA);
    }

    async function post(data, userId) {

        const post = {
            id: nanoid(),
            title: data.title,
            text: data.text,
            user: userId
        }

        return await store.upsert(TABLA, post);
    }

    async function get(id) {
        const join = {
            key: 'user',
            value: 'user',
        }
        let result = await store.get(TABLA, 'user', id, 'string', join);
        result = JSON.parse(JSON.stringify(result));        
        return result;
    }

    return {
        list,
        post,
        get
    }


}