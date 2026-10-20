const mongoose=require('mongoose');

const dbConn=async()=>{
    mongoose.connect(process.env.DATABASE_URI)
}

module.exports=dbConn;