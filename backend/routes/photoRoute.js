const express=require('express');
const router=express.Router();
const {getPhotoById} = require( "../controllers/photoController");
const verifyToken=require("../middlewares/auth");
router.get('/photosOfUser/:id',verifyToken,getPhotoById);

module.exports=router;