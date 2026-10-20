const User=require('./model/User')


const register=async()=>{
    const {user,pwd}=req.body;
    if(!req?.body?.user||!req?.body?.pwd){return res.status(401).json({'message':'user and pwd required'})};
    
}


module.exports=register;