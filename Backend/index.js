const express = require('express');
const connectDb = require('./config/db');
require('dotenv').config()




const app = express()
app.use(express.json())


connectDb()


const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`))