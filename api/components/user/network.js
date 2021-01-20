const express = require('express');
const response = require('../../../network/response');
const router = express.Router();
const controller = require('./index');

router.get('/', async (req, res) => {
    try {
        const lista = await controller.list();
        response.success(req, res, lista, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
});



router.get('/:id', async (req, res) => {
    try {
        const user = await controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
});


router.post('/', async (req, res) => {
    try {
        controller.post(req.body);
        response.success(req, res, `Usuario ${req.body.name} creado`, 201);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
});



router.patch('/:id', (req, res) => {
    try {
        controller.update(req.params.id, req.body.name);
        response.success(req, res, `Se actualizo usuario ${req.body.id}`, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
});



router.delete('/:id', (req, res) => {
    try {
        controller.remove(req.params.id);
        response.success(req, res, `Se elimino el usuario ${req.params.id}`, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
});

module.exports = router;