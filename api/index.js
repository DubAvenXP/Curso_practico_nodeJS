//librerias
const express = require("express");
const swaggerUi = require('swagger-ui-express');

//archivos internos
const config = require("../config");
const user = require("./components/user/network");
const auth = require('./components/auth/network');
const swaggerDoc = require('./swagger.json');
const errors = require('../network/errors')

const app = express();

//Para poder recibir un json (es el bodyParser ya implementado en express)
app.use(express.json());

//router (aca van todas las rutas)
app.use("/api/user", user);
app.use('/api/auth', auth);

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//Middleware ?
app.use(errors);

//api port
app.listen(config.api.port, () => {
    console.log(`Api escuchando en http://localhost:${config.api.port}`);
});
