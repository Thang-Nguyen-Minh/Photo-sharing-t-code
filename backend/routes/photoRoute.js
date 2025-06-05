const express=require('express');
const router=express.Router();
const {getPhotoById,getComment} = require( "../controllers/photoController");
const verifyToken=require("../middlewares/auth");
router.get('/photosOfUser/:id',verifyToken,getPhotoById);
router.post('/commentsOfPhoto/:photo_id',verifyToken,getComment);
module.exports=router;