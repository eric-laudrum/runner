const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    // Extract token
    const authHeader = req.header('Authorization');

    // Reject missing headers
    if(!authHeader) {
        return res.status(401).json({message: 'Error: no token provided'});
    }

    try{
        // Handle bearer prefix
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET|| 'fallback_secret');

        req.user = decoded.userId;

        next();
    } catch(err){
        res.status(401).json({message: 'Token could not be authorized'});
    }
};