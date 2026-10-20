const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reservationSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    room:{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkIn:{
        type: Date,
        required: true
    },
    checkOut:{
        type:Date,
        required: true
    },
    totalPrice:{
        type: Number,
        required:true
    },
    status:{
        type:String,
        default: 'confirmed'
    }
})
module.exports=mongoose.model("Reservation",reservationSchema);