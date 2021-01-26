const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user'


module.exports =  (injectedStore, injectedCache) => {
    
    let store = injectedStore;
    let cache = injectedCache;

    //if (!store) store = require('../../../store/dummy');
    if (!cache) {
        cache = require('../../../store/dummy');
    }

    async function list() {
        const data = await store.list(TABLA);
        console.log(data);
        // let data = await cache.list(TABLA)
        // console.log(data);
        // if (!data) {
        //     console.log('Informacion no guardada en cache');
        //     cache.upsert(TABLA, data);
        // } else {
        //     console.log('datos en cache')
        // }
        return data;
    }

    function get(id) {
        return store.get(TABLA, 'id', id, 'string');
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

    async function follow(from, to) {
        return await store.upsert(`${TABLA}_follow`, {
            user_from: from,
            user_to: to,
        });
    }
    
    async function followers(id, options) {      
        const join = {
            key: TABLA,
            value: options.a,
        };

        let follower = await store.get(`${TABLA}_follow`, options.b, id, 'string', join);
        follower = JSON.parse(JSON.stringify(follower));
        console.log(follower);
        const followers = follower.map((item) => {
            const newObj = {
                id: item.id,
                username: item.username,
            };
            return newObj
        });
        return followers;

        //return follower;
    }

    

    return {
        list,
        get,
        post,
        update,
        remove,
        follow,
        followers
    }
}