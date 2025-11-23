const express = require('express');
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db');
const config = require('./config/index');
require('dotenv').config()
const authRoute = require('./routes/authRoute');




const app = express()
app.use(express.json())
app.use(cookieParser())


connectDb()


//api route
app.use('/auth',authRoute)


const PORT =  config.port || 5000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`))