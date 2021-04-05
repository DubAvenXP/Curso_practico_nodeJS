//librerias
const express = require("express");

//archivos internos
const config = require("../config");
const post = require('./components/post/network');
const errors = require('../network/errors')

const app = express();

//Para poder recibir un json (es el bodyParser ya implementado en express)
app.use(express.json());

//router (aca van todas las rutas)
app.use('/api/post', post);

//Middleware ?
app.use(errors);

//api port
app.listen(config.postService.port, () => {
    console.log(`Servicio de Posts escuchando en http://localhost:${config.postService.port}`);
});
