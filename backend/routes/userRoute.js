const express=require('express');
const router=express.Router();
const {getUserList,getUserById} =  require("../controllers/userController");
const verifyToken=require("../middlewares/auth");
router.get('/list',verifyToken,getUserList);
router.get('/:id',verifyToken,getUserById);

module.exports=router;