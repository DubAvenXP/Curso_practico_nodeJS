const express = require('express');
const config = require('../config')

const app = express();
//Para poder recibir un json
app.use(express.json());
const user = require('./components/user/network');


//router

app.use('/api/user', user)


app.listen(config.api.port, () => {
    console.log(`Api escuchando en el puerto ${config.api.port}`);
});

