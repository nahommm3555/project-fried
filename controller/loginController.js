const User=require('../model/User');
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const login=async(req,res)=>{
    try{
        const {user,pwd,email}=req.body;
        if(!req?.body?.pwd ||(!req?.body?.user&&!req?.body?.email)){
            return res.status(400).json({'message':'pwd and one of user/email are required'})
        }
        let foundUser;
        if (user && email) {
            foundUser = await User.findOne({
                name: user,
                email
            }).exec();
        } else if (user) {
            foundUser = await User.findOne({
                name: user
            }).exec();
        } else {
            foundUser = await User.findOne({
                email: email
            }).exec();
        }
        if(!foundUser){return res.status(401).json({'message':'Invalid username/email or password'})}
        const match= await bcrypt.compare(pwd,foundUser.password);
        if(match){
            const accessToken=jwt.sign({"user-info":{
                "name":foundUser.name,
                "email":foundUser.email
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
            )
            const refreshToken=jwt.sign({"userInfo":{
                "name":foundUser.name,
                "email":foundUser.email
            }},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
            )
            foundUser.refreshToken=refreshToken;
            const result= await foundUser.save();
            res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'none',maxAge:24*60*60*1000});
            res.json({accessToken});
        }
        else{return res.status(401)}
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message})
    }
}

module.exports=login