const mysql = require('mysql');
const config = require('../config');
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};


// Connect!
let connection;

function handleCon() {
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if (err) {
            console.error('[db error] error: ' + err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('db connected!');
        }
    });
    
    connection.on('error', err => {
        console.error('[db error] error: ' + err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw new Error(err);
        }
    });
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function get(table, search, searched, type) {
    
    if (type === 'string') searched = `'${searched}'`;

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${search} = ${searched}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    });
}

function upsert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function update(table, id, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id = '${id}'`, [data, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

async function query(table, username) {
    let user = await get(table, 'username', username, 'string');
    
    return {
        id: user[0].id,
        username: user[0].username,
        password: user[0].password,
    };
}


module.exports = {
    list,
    get,
    upsert,
    update,
    query
}