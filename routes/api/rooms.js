const {createRoom,getAllRooms,getRoom,updateRoom,deleteRoom}=require('../../controller/roomController');
const ROLES_LIST=require('../../config/roles_list');
const verifyRoles=require('../../middleware/verifyRoles');
const express=require('express');
const router=express.Router();

router.route('/')
    .get(getAllRooms)
    .post(verifyRoles(ROLES_LIST.Admin),createRoom)
;
router.route('/:id')
    .get(getRoom)
    .patch(verifyRoles(ROLES_LIST.Admin),updateRoom)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteRoom)
;

module.exports=router