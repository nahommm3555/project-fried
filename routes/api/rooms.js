const {createRoom,getAllRooms,getRoom,updateRoom,deleteRoom}=require('../../controller/roomController');
const express=require('express');
const router=express.Router();

router.route('/')
    .get(getAllRooms)
    .post(createRoom)
;
router.route('/:id')
    .get(getRoom)
    .patch(updateRoom)
    .delete(deleteRoom)
;

module.exports=router