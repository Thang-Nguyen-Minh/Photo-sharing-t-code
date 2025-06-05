const express=require('express');
const router=express.Router();
const {userLogin,userLogout,userSignUp} =  require("../controllers/authController");

router.post('/login',userLogin);
router.post('/logout',userLogout);
router.post('/signUp',userSignUp);
module.exports=router;