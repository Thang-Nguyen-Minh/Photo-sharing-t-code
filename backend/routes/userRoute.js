const express=require('express');
const router=express.Router();
const {getUserList,getUserById} =  require("../controllers/userController");
router.get('/list',getUserList);
router.get('/:id',getUserById);
module.exports=router;