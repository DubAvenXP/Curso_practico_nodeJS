const TABLA = "auth";
const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const err = require('../../../utils/error');

module.exports = (injectedStore) => {
    let store = injectedStore;

    if (!store) store = require("../../../store/dummy");

    /**
     * 
     * @param {nombre de usuario} username 
     * @param {contraseña del usuario} password 
     * @returns token (si la contraseña y usuarios son correctos)
     */
    async function login(username, password) {
        
        // data: objeto con la informacion del usuario, id, username y password
        const data = await store.query(TABLA, {username: username});
        //comprobacion de la contaseña, de tipo booleano
        const passwordIsOk = await bcrypt.compare(password, data.password);

        if (passwordIsOk === true) {
            // sign(data) comprueba que la contraseña
            return auth.sign(data);
        } else {
            throw err('Informacion invalidad', 404);
        }

        
    }

    /**
     * Es buena practica guardar la contraseña es una tabla
     * o db diferente a la del usuario (por seguridad) 
     * 
     * @param {objeto con informacion del usuario,
     * concretamente username, password, id} data 
     * @returns void
     */

    async function upsert(data) {
        const authData = {
            id: data.id,
        };

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            /**
             * Es mala practica guardar la contraseña en texto plano
             * por eso, se usan librerias como bcrypt para encriptarlas
             * El segundo paramentro de bcrypt.hash indica cuantas veces 
             * ejecutara el algoritmo, en este caso ejecuta 5 veces el 
             * algoritmo, mientras mas veces se ejecute mas segura 
             * sera la contraseña, pero el proceso de generacion de 
             * la misma sera mas lento.
             * 
             * (lo recomendado son de 5 a 10 ejecuciones)
             */
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
