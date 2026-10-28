const handleRefreshToken=require('../controller/refreshTokenContoller');
const express=require('express');
const router=express.Router();

router.get('/',handleRefreshToken);

module.exports=router

