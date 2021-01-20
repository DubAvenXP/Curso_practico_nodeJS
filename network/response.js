const success = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.status(statusCode).send({
        error: false,
        status: statusCode, 
        body: statusMessage,
    });
} 
const error = (req, res, error, status, details) => {
    let statusCode = status || 500;
    let statusMessage = error.message || 'Internal server error';

    console.error('[Response error] ' + error);
    res.status(statusCode).send({
        error: statusMessage,
        status: statusCode,  
        body: ''
});
} 

module.exports = {
    
    success,
    error
    
}