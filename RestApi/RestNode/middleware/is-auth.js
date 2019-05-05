const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const err = new Error('Not Authenticated.!');
        err.statusCode = 401;
        throw err;
    }

    let decodedToken;

    try {
        const token = req.get('Authorization').split(' ')[1];
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken) {
        const err = new Error('Not Authenticated.!');
        err.statusCode = 401;
        throw err;
    }
    req.userId = decodedToken.userId;
    next();
};