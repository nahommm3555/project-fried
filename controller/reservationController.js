const Reservation=require('../model/Reservation');
const Room = require('../model/Room');


const addReservation=async (req,res)=>{
    const {room,checkIn,checkOut}=req.body;
    if (!req?.body?.room||!req?.body?.checkIn||!req?.body?.checkOut) return res.status(401).json({message:"missing fields"});
    const startDate=new Date(checkIn);
    const endDate=new Date(checkOut);
    if(Number.isNaN(startDate.getTime())||Number.isNaN(endDate.getTime())) return res.status(400).json({message:"Invalid Dates"});
    if(endDate<=startDate)return res.status(400).json({message:"checkIn can't be later than checkOut"});
    const foundRoom=await Room.findById(room);
    if(!foundRoom)return res.status(404).json({message:"room not found"});
    const conflict = await Reservation.findOne({
        room,
        status: 'confirmed',
        checkIn: { $lt: endDate },
        checkOut: { $gt: startDate }
    });

    if (conflict) {
        return res.status(409).json({
            message: 'Room is already booked for these dates'
        });
    }
    const nights=(endDate-startDate)/(1000*60*60*24)
    const totalPrice=nights*foundRoom.pricePerNight;
    const newRes=await Reservation.create({
        user:req.user.id,
        room,
        checkIn,
        checkOut,
        totalPrice,
        status:'confirmed'
    });
    res.status(201).json(newRes);
};

const viewMyReservations=async (req,res)=>{
    const user=req.user.id;
    const foundRes=await Reservation.find({user}).exec();
    if(!foundRes)return res.status(404).json({message:"reservation not found"});
    res.status(200).json(foundRes);
}

const viewAllReservations=async (req,res)=>{
    const user=req.user.id;
    const foundRes=await Reservation.find().exec();
    if(!foundRes)return res.status(404).json({message:"reservation not found"});
    res.status(200).json(foundRes);
}

const viewAReservation=async (req,res)=>{
    const user=req.user.id;
    const {id}=req.params;
    if(!id)return res.status(401).json({message:"id is required"});
    const foundRes=await Reservation.findOne({user,_id:id}).exec();
    if(!foundRes)return res.status(404).json({message:"reservation not found"});
    res.status(200).json(foundRes);
}

const viewAnyReservation=async (req,res)=>{
    const {id}=req.params;
    if(!id)return res.status(401).json({message:"id is required"});
    const foundRes=await Reservation.findOne({_id:id}).exec();
    if(!foundRes)return res.status(404).json({message:"reservation not found"});
    res.status(200).json(foundRes);
}
const cancelReservation=async (req,res)=>{
    const {id}=req.params;
    if(!id)return res.status(401).json({message:"no id found"});
    const foundRes=await Reservation.findById(id).exec();
    if(!foundRes)return res.status(404).json({message:"reservation not found"});
    const result= await foundRes.deleteOne();
    res.status(201).json({message:"reservation successfully cancelled"});
}


module.exports={addReservation,viewMyReservations,viewAnyReservation,viewAllReservations,viewAReservation,cancelReservation}