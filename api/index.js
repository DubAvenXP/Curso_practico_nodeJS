const express = require("express");
const config = require("../config");
const swaggerUi = require('swagger-ui-express');

const app = express();

//Para poder recibir un json
app.use(express.json());

const user = require("./components/user/network");
const auth = require('./components/auth/network');
const swaggerDoc = require('./swagger.json');

//router
app.use("/api/user", user);
app.use('/api/auth', auth);
// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(config.api.port, () => {
    console.log(`Api escuchando en http://localhost:${config.api.port}`);
});
