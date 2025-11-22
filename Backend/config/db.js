const mongoose = require('mongoose');



const connectDb = async() =>{
      try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('database connected successfully');
      } catch (error) {
        console.error('something is wrong', error.message);
        process.exit(1);
      }
}

module.exports= connectDb;