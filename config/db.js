// const mongoose = require('mongoose');
// const config = require('config');

// const db = config.get('mongoURI');


// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     console.log('MongoDB Connected...');
//   } catch(err){
//     console.error(err.message);
//     // Exit process with failure
//     process.exit(1);
//   }
// }

// module.exports = connectDB;



const mongoose=require("mongoose")

const connectDB=async ()=>{
    console.log(`Mongo URI : ${process.env.MONGO_URI}`)
   const conn= await mongoose.connect(process.env.MONGO_URI,

    {
       useNewUrlParser:true,
       useCreateIndex:true,
       useFindAndModify:false ,useUnifiedTopology: true
    }
    )
console.log(`connected to Mongo:${conn.connection.host}`)
} 

module.exports=connectDB