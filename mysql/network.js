const express = require('express');
const response = require('../network/response');
const router = express.Router();
const store = require('../store/mysql');

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table/:id', update);

async function list(req, res) {
    try {
        const data = await store.list(req.params.table)
        response.success(req, res, data, 200);
    } catch (error) {
        console.error(error);
        response.error(req, res, error, 500, 'Error interno');
    }
}

async function get(req, res) {
    try {
        const data = await store.get(
            req.params.table, 
            req.body.search, 
            req.params.id, 
            req.body.type,
            req.body.join);
        response.success(req, res, data, 200);
    } catch (error) {
        console.error(error);
        response.error(req, res, error, 500, 'Error interno');
    }
}

async function insert(req, res) {
    try {
        const data = await store.upsert(req.params.table, req.body)
        response.success(req, res, data, 200);
    } catch (error) {
        console.error(error);
        response.error(req, res, error, 500, 'Error interno');
    }
}

async function update(req, res) {
    try {
        const data = await store.update(req.params.table, req.params.id, req.body)
        response.success(req, res, data, 200);
    } catch (error) {
        console.error(error);
        response.error(req, res, error, 500, 'Error interno');
    }
}


module.exports = router;