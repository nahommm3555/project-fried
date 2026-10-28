require('dotenv').config()
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const mongoose=require('mongoose');
const dbConn=require('./config/dbConn');
const PORT=process.env.PORT||3500;

dbConn();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/register',require('./routes/register'));
app.use('/api/login',require('./routes/login'));
app.use('/api/refresh',require('./routes/refresh'));

app.use((req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});

mongoose.connection.once('open',()=>{
    console.log("DB connection sucessful")
    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    })
})