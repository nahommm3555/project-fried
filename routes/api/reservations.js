const {addReservation,viewMyReservations,viewAllReservations,viewAnyReservation,viewAReservation,cancelReservation}=require('../../controller/reservationController')
const verifyRoles=require('../../middleware/verifyRoles');
const ROLES_LIST=require('../../config/roles_list')
const express=require('express');
const router=express.Router();

router.route('/')
    .get(viewMyReservations)
    .post(addReservation)
;
router.route('/admin')
    .get(verifyRoles(ROLES_LIST.Admin),viewAllReservations)
    .get(verifyRoles(ROLES_LIST.Admin),viewAnyReservation)
;
router.route('/:id')
    .get(viewAReservation)
    .delete(cancelReservation)
;

module.exports=router