const User=require('../model/User');
const bcrypt=require('bcrypt');

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
                email: email
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
        if(!match){return res.status(401).json({'message':'Invalid username/email or password'})}
        res.status(200).json({'message':`user ${foundUser.name} succefully logged in`});
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message})
    }
}

module.exports=login