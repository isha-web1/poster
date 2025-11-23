const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path : path.join(process.cwd(), '.env')});

 module.exports= {
    port: process.env.PORT,
    database_url : process.env.MONGO_URL,
    bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS,
    jwt_expires_in : process.env.JWT_EXPIRES_IN,
    jwt_secret : process.env.JWT_SECRET
   

};