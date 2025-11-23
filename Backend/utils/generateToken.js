const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (user)=>{
    return jwt.sign({userId: user?._id, email: user.email}, config.jwt_secret, {expiresIn: config.jwt_expires_in});
}

module.exports = {generateToken}