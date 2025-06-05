const express=require('express');
const router=express.Router();
const {getPhotoById} = require( "../controllers/photoController");
router.get('/photosOfUser/:id',getPhotoById);
module.exports=router;