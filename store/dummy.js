const db = {
    'user': [
        { id: '0', name: 'Sumi', username: 'sumi1202'},
        { id: '1', name: 'Ruka', username: 'rukaXkazuya'},
        { id: '2', name: 'Chizuru', username: 'chizuruMX'},
        { id: '3', name: 'Mami', username: 'maminanami'},
    ],
    // 'auth': [
    //     {id: '0', username: 'sumi1202', password: '123'},
    //     {id: '1', username: 'rukaXKazuya', password: '123'},
    //     {id: '2', username: 'chizuruMX', password: '123'},
    // ]
};


async function list(table) {
    return db[table] || [];
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
    console.log(db[table]);
}

async function updateName(table, id, name) {
    db[table].filter(item => 
        item.id === id ? item.name = name : null  
        );
}

async function remove(table, id) {
    db[table].splice(id, 1);
}

async function query(table, q) {
    let collection = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];

    return collection.filter( item => item[key] === q[key])[0] || null;

}

module.exports = {
    list,
    get,
    upsert,
    updateName,
    remove,
    query
}