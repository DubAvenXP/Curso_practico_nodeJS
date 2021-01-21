const db = {
    'user': [
        { id: '0', name: 'Sumi', username: 'sumi1202'},
        { id: '1', name: 'Ruka', username: 'rukaXkazuya'},
        { id: '2', name: 'Chizuru'},
        { id: '3', name: 'Mami', username: 'maminanami'},
    ]
};


async function list(table) {
    return db[table];
}

async function get(table, id) {
    let collection = await list(table);
    return collection.filter( item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data);
}

async function updateName(table, id, name) {
    db[table].filter(item => 
        item.id === id ? item.name = name : null  
        );
}

async function remove(table, id) {
    db[table].splice(id, 1);
}

module.exports = {
    list,
    get,
    upsert,
    updateName,
    remove
}