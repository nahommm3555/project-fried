const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    roles:{
        User:{
            type: Number,
            default:2006
        },
        Admin: Number
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    refreshToken: String
})
module.exports=mongoose.model("User",userSchema);