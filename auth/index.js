const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.jwt.secret;
const err = require('../utils/error');


function sign(data) {
    //genera un token con la informacion del usuario y un secreto
    return jwt.sign(data, secret);
}

//Permisos
//comprobar si el usuario tiene los permiso para realizar determinada accion
const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        //Comprabar si es o no propio
        // console.log('decoded.id ' + decoded.id )
        // console.log('owner ' + owner)
        if (decoded.id !== owner) {
            throw err('No puedes hacer esto', 401)
        }
    },
    logged: function (req) {
        const decoded = decodeHeader(req);
    }
}

function verify(token) {
    return jwt.verify(token, secret)
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    }
    
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token)

    req.user = decoded;

    return decoded
}

module.exports = {
    sign,
    check,
}