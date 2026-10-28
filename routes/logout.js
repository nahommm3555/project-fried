const logoutController=require('../controller/logoutController');
const express=require('express');
const router=express.Router();

router.post('/',logoutController);

module.exports=router