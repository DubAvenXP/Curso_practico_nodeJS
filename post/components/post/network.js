const express = require('express');
const response = require('../../../network/response');
const router = express.Router();
const controller = require('./index');
const secure = require('./secure');


router.get('/', listPosts);
router.get('/user/:id', secure('post'), listPostsByUser);
router.post('/', secure('post'), createPost);

async function listPosts(req, res) {
    try {
        const lista = await controller.list();
        response.success(req, res, lista, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

async function listPostsByUser(req, res) {
    try {
        const lista = await controller.get(req.params.id);
        response.success(req, res, lista, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

function createPost(req, res) {
    try {
        const result = controller.post(req.body, req.user.id);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, error, 500, 'Error interno');
    }
}

module.exports = router;