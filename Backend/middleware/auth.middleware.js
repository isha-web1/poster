const jwt = require('jsonwebtoken');
const config = require('../config'); 
const response = require('../utils/responseHandler'); 

const authMiddleware = (req, res, next) => {
    // 1. Get the token from the cookie
    const token = req.cookies.auth_token;

    if (!token) {
        // No token found (user is not logged in)
        return response(res, 401, "Authentication failed. No token provided.");
    }

    try {
        // 2. Verify the token using the secret key
        const decoded = jwt.verify(token, config.jwt_secret);

        // 3. Attach the decoded user payload to the request object
        
        req.user = decoded; 
        
        next();

    } catch (error) {
        // Token is invalid, expired, or tampered with
        console.error("JWT Verification Error:", error.message);
        return response(res, 401, "Authentication failed. Invalid or expired token.");
    }
};

module.exports = authMiddleware;