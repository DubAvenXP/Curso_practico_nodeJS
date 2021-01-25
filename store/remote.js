const request = require('request');

function createRemoteDB(host, port) {
    const URL = 'http://' + host + ':' + port;
    

    async function list(table) {
        return await req('GET', table);
    }


    async function get(table, search, searched, type, join) {
        return await req('GET', `${table}/${searched}`, {
            search: search,
            type: type,
            join: join
        });
    }


    function upsert(table, data) {
        req('POST', table, data);
    }

    
    function update(table, id, data) {
        req('PUT', `${table}/${id}`, data)
    }
    // function remove(table, id) {
        
    // }


    function req(method, table, data) {
        let url = URL + '/' + table;
        body = '';

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body: JSON.stringify(data),
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la db remota');
                    return reject(err.message);
                }
                const response = JSON.parse(body);
                return resolve(response.body);
            })
        });
    }

    return {
        list,
        get,
        upsert,
        update
    }

}

module.exports = createRemoteDB;