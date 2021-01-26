const express = require("express");
const config = require('../config');

const router = require('./network');
const app = express();
app.use(express.json());

// rutas
app.use('/', router)

app.listen(config.cacheService.port, () => {
    console.log(`Servicio de Cache escuchando en http://localhost:${config.cacheService.port}`);
});