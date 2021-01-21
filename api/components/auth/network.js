const express = require('express');
const response = require('../../../network/response');
const router = express.Router();
const controller = require('./index');

router.post('/login', login);

async function login(req, res) {
    try {
        const token = await controller.login(req.body.username, req.body.password);
        response.success(req, res, token, 200);
    } catch (error) {
        response.error(req, res, error, 400, 'Informacion invalida');
    }
}


module.exports = router;