const express = require('express');
const response = require('../../../network/response')
const router = express.Router();

router.get('/', (req, res) => {
    response.success(req, res, 'Usuarios obtenidos exitosamente');
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