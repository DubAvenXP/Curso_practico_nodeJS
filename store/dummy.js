const db = {
    'user': [
        { id: 0, name: 'Sumi'},
        { id: 1, name: 'Ruka'},
        { id: 2, name: 'Chizuru'},
        { id: 3, name: 'Mami'},
    ]
};


function list(table) {
    return db[table];
}
function get(table, id) {
    let collection = list(table);
    return collection.find( item => item.id === id)[0] || null;
}
function upsert(table, data) {
    db[table].push(data);
}
function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}