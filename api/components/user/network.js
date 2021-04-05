const express = require('express');
const response = require('../../../network/response');
const router = express.Router();
const controller = require('./index');
const secure = require('./secure'); 

router.get('/', listUsers);
router.get('/:id', listUserById);
router.post('/', postUser);
router.patch('/:id', secure('update'), updateUser);
router.delete('/:id', removeUser);
router.post('/follow/:id', secure('follow'), follow);
router.get('/followers/:id', secure('follow'), followers);
router.get('/following/:id', secure('follow'), following);

async function listUsers(req, res) {
    try {
        const lista = await controller.list();
        response.success(req, res, lista, 200);
    } catch (error) {
        console.error(error);
        response.error(req, res, error, 500, 'Error interno');
    }
}

async function listUserById(req, res) {
    try {
        const user = await controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

function postUser(req, res) {
    try {
        const result = controller.post(req.body);
        response.success(req, res, `Usuario creado`, 201);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

function updateUser(req, res) {
    try {
        controller.update(req.params.id, req.body);
        response.success(req, res, `Se actualizo usuario ${req.params.id}`, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

function removeUser(req, res) {
    try {
        controller.remove(req.params.id);
        response.success(req, res, `Se elimino el usuario ${req.params.id}`, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

/**
 * Vale aclarar que es una propiedad que le pusimos al 
 * objeto req nosotros mismos en el código.
 * En decodeHeader de auth/index.js fijate que hacemos
 * req.user = decoded;
 * De esa manera en user/network.js en
 * router.post(’/follow/:id’, secure(‘follow’), follow);
 * una vez termina de ejecutar secure, 
 * el objeto req ya tiene cargado por nosotros el req.user.
 */

async function follow(req, res, next) {
    try {
        await controller.follow(req.user.id, req.params.id)
        response.success(req, res, `Usuario seguido`, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
        
    }
}

async function followers(req, res, next) {
    try {
        const list = await controller.followers(req.user.id, {
            a: 'user_from',
            b: 'user_to',
        });
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

async function following(req, res, next) {
    try {
        const list = await controller.followers(req.user.id, {
            a: 'user_to',
            b: 'user_from',
        });
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

module.exports = router;