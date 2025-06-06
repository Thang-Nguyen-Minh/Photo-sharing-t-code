const express=require('express');
const router=express.Router();
const {getPhotoById,getComment,deletePhoto,editPhoto} = require( "../controllers/photoController");
const verifyToken=require("../middlewares/auth");

router.get('/photosOfUser/:id',verifyToken,getPhotoById);
router.post('/commentsOfPhoto/:photo_id',verifyToken,getComment);
//Thêm đường dẫn với phương thức delete
router.delete('/:id',verifyToken,deletePhoto);
//Replace ảnh là phương thức put
router.put('edit/:id',verifyToken,editPhoto);
module.exports=router;