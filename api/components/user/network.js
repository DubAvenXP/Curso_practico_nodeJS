const express = require('express');
const response = require('../../../network/response');
const router = express.Router();
const controller = require('./controller');

router.get('/', (req, res) => {
    const lista = controller.list();
    response.success(req, res, lista, 200);
});
router.post('/', (req, res) => {
    res.send('todo funciona');
});
router.patch('/', (req, res) => {
    res.send('todo funciona');
});
router.delete('/', (req, res) => {
    res.send('todo funciona');
});

module.exports = router;