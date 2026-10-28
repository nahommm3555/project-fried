const User=require('../model/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const logoutController=async (req,res)=>{
    try{
        const {user,pwd}=req.body;
        if(!req?.body?.user||!req?.body?.pwd)return res.status(401).json({"message":"username and password are required"})
        const cookies=req.cookies;
        if(!cookies)return res.status(403);
        const refreshToken=cookies.jwt;
        const foundUser=await User.findOne({name:user}).exec();
        if(!foundUser)return res.status(401);
        const match=await bcrypt.compare(pwd,foundUser.password);
        if(!match)return res.status(401);
        foundUser.refreshToken=null;
        await foundUser.save();
        res.clearCookie('jwt',{httpOnly:true,sameSite:'none',maxAge:24*60*60*1000});
        res.status(204).json({"message":`user ${user} has succesfully been logged out`});

    }catch(err){
        console.error(err);
        return res.status(500).json({err});

    }
}

module.exports=logoutController