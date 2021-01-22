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



module.exports = router;