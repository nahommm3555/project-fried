const register=require('../controller/registerController');
const express=require('express');
const registerRouter=express.Router();

registerRouter.post('/',register);

module.exports=registerRouter;
