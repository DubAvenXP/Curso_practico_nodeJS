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
            data = JSON.parse(JSON.stringify(data));
            resolve(data);
        });
    });
}
/**
 * 
 * @param {tabla} table 
 * @param {matriz (en donde buscar)} search 
 * @param {valor buscado} searched 
 * @param {string o int} type 
 * @param {objeto con 
 * key: tabla en donde se buscara
 * value: fereign key de la tabla principal
 *  } join 
 * @returns filtro
 */
function get(table, search, searched, type, join) {
    let joinQuery = '';
    if (join) {
        joinQuery = `JOIN ${join.key} ON ${table}.${join.value} = ${join.key}.id`;
    }

    if (type === 'string') searched = `'${searched}'`;

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${search} = ${searched}`, (err, data) => {
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
    return await get(table, 'username', username, 'string');
}


module.exports = {
    list,
    get,
    upsert,
    update,
    query
}