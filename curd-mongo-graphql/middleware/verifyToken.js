const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = ( req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        res.status(403).send("token is required for authentication");
    }
    try {
        const decoded = jwt.verify( token, config.secret_token);
        req.user = decoded;
    }
    catch (err) {
        res.status(401).send("invalid token");
    }
    return next();

}

module.exports = verifyToken