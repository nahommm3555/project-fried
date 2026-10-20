const User=require('../model/User');
const bcrypt=require('bcrypt');

const register=async(req,res)=>{
    try{
        const {user,pwd,email}=req.body;
        if(!req?.body?.user||!req?.body?.pwd){return res.status(401).json({'message':'user and pwd required'})};
        const hashedPwd=await bcrypt.hash(pwd,10);
        const newUser=await User.create({
            name:user,
            password:hashedPwd,
            email
        })
        res.status(201).json({'message':`User ${user} created`});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


module.exports=register;