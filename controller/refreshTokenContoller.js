const User=require('../model/User');
const jwt=require('jsonwebtoken');

const handleRefreshToken=async (req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){return res.status(401).json({"message":"invalid token"})};
    const refreshToken=cookies.jwt;
    const foundUser=await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.status(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err||foundUser.name!==decoded.userInfo.name) return res.status(403);
            const roles=Object.values(foundUser.roles);
            const accessToken=jwt.sign(
                {"userInfo":{
                    "roles":roles,
                    "name":foundUser.name,
                    "email":foundUser.email
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'15m'}
            );
            res.json({accessToken});
        }
    )
}

module.exports=handleRefreshToken