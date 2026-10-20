require('dotenv').config()
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dbConn=require('./config/dbConn');
const PORT=process.env.PORT||3500;

dbConn();



mongoose.connection.once('open',()=>{
    console.log("DB connection sucessful")
    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    })
})