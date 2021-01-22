const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    //Middleware utilizado para comprobar si un usuario tiene permisos para realizar una accion
    //Compara el token generado con el token que el usuario tiene
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                //
                const owner = req.params.id;
                auth.check.own(req, owner);
                next();
                break;
        
            default:
                next();
                break;
        }
    }
    
    return middleware
}