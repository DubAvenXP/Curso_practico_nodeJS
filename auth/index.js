const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        //Comprabar si es o no propio
        // console.log('decoded.id ' + decoded.id )
        // console.log('owner ' + owner)
        if (decoded.id !== owner) {
            throw new Error('No puedes hacer esto');
        }
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