const login=require('../controller/loginController');
const express=require('express');
const loginRouter=express.Router();

loginRouter.post('/',login);

module.exports=loginRouter