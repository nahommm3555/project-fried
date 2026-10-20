const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const roomSchema=new Schema({
    roomNumber:{
        type:Number,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    pricePerNight:{
        type: Number,
        required: true
    },
    capacity: {
        type:Number,
        required:true,
        min:1
    },
    description:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Room",roomSchema);