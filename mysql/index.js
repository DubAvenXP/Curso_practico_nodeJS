const express = require("express");
const config = require('../config');

const app = express();
const  mysql = require('./network');
app.use(express.json());

// rutas

app.use(mysql);

app.listen(config.mysqlService.port, () => {
    console.log(`Servicio de MySql escuchando en http://localhost:${config.mysqlService.port}`);
});