module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || '',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SER_HOST || 'localhost'
    },
    postService: {
        port: process.env.POST_SRV_PORT || 3002,
        host: process.env.MYSQL_SER_HOST || 'localhost'
    },
    remoteDb: process.env.REMOTE_DB || false
}