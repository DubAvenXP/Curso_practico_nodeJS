module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'f9PyMwC8V5',
        password: process.env.MYSQL_PASSWORD || 'wuWJPsK3if',
        database: process.env.MYSQL_DATABASE || 'f9PyMwC8V52',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SER_HOST || 'localhost'
    },
    postService: {
        port: process.env.POST_SRV_PORT || 3002,
        host: process.env.MYSQL_SER_HOST || 'localhost'
    },
    remoteDb: process.env.REMOTE_DB || false,
    cacheService: {
        port: process.env.CACHE_SRV_PORT || 3003,
        host: process.env.CACHE_SRV_HOST || 'localhost'
    },
    redis: {
        port: process.env.REDIS_PORT || 11986,
        host: process.env.REDIS_HOST || 'redis-11986.c89.us-east-1-3.ec2.cloud.redislabs.com',
        password: process.REDIS_PASS || '0DyZcdIhPticaHjBZWPTioZclGEolZHs'
    }
    
}