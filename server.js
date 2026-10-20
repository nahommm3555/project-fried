require('dotenv').config()
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dbConn=require('./config/dbConn');
const registerRouter=require('./routes/register');
const loginRouter=require('./routes/login');
const PORT=process.env.PORT||3500;

dbConn();

app.use(express.json());

app.use('/api/register',registerRouter);
app.use('/api/login',loginRouter);

mongoose.connection.once('open',()=>{
    console.log("DB connection sucessful")
    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    })
})