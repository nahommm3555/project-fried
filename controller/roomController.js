const Room=require('../model/Room');


const createRoom=async (req,res)=>{
    try{
        const {roomNum,type,capacity,pricePerNight,desc}=req.body;
        if(!roomNum||!type||!capacity||!pricePerNight||!desc)return res.sendStatus(401);
        const duplicate=await Room.findOne({roomNumber:roomNum}).exec();
        if(duplicate)return res.status(409).json({message:"you can't have two same rooms"});
        const newRoom=await Room.create({
            roomNumber:roomNum,
            type,
            capacity,
            pricePerNight,
            description:desc
        });
        res.status(200).json({
            message:'new room succesfully created',
            data:newRoom
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({message:err.message});
    };
};

const getAllRooms=async (req,res)=>{
    const rooms=await Room.find();
    if(!rooms)return res.status(201).json({message:'No rooms found'});
    res.json({rooms});
}

const getRoom=async(req,res)=>{
    console.log(req.params);
    console.log(req.params.id);
    const {id}=req.params;
    if(!id)return res.status(401).json({message:'no id in the params'});
    const room=await Room.findOne({_id:id}).exec();
    console.log(room);
    if(!room)return res.status(201).json({message:"no room found"});
    res.json({room});
}
const updateRoom=async (req,res)=>{
    const {roomNum,type,capacity,pricePerNight,desc}=req.body;
    if(!roomNum && !type && !capacity && !pricePerNight && !desc)return res.status(401).json({message:"you can't leave all fields empty"});
    const duplicate=await Room.findOne({roomNumber:roomNum}).exec();
    if(duplicate)return res.status(409).json({message:"you can't have two same rooms"});
    const {id}=req.params;
    const foundRoom=await Room.findOne({_id:id}).exec();
    if(!foundRoom)return res.status(404).json({message:"room not found"});

    if (roomNum !== undefined) foundRoom.roomNumber = roomNum;
    if (desc !== undefined) foundRoom.description = desc;
    if (type !== undefined) foundRoom.type = type;
    if (capacity !== undefined) foundRoom.capacity = capacity;
    if (pricePerNight !== undefined) foundRoom.pricePerNight = pricePerNight;
    const updatedRoom=await foundRoom.save();
    res.status(201).json(updatedRoom);
}
const deleteRoom=async(req,res)=>{
    const {id}=req.params;
    if(!id)return res.status(401).json({message:'enter room id'});
    const foundRoom=await Room.findOne({_id:id}).exec();
    if(!foundRoom)return res.status(404).json({message:"room not found"});
    const result=await foundRoom.deleteOne();
    res.status(200).json({message:"room succesfully deleted"});
}

module.exports={createRoom,getAllRooms,getRoom,updateRoom,deleteRoom}