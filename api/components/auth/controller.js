const TABLA = "auth";
const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');

module.exports = (injectedStore) => {
    let store = injectedStore;

    if (!store) store = require("../../../store/dummy");

    async function login(username, password) {
        
        const data = await store.query(TABLA, {username: username});
        const passwordIsOk = await bcrypt.compare(password, data.password);

        if (passwordIsOk === true) {
            return auth.sign(data);
        } else {
            throw new Error('Informacion invalida');
        }

        
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        };

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            //hashear password
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login
    };
};
