const express=require('express');
const router=express.Router();
const {PhotoUpload,editPhoto} =  require("../controllers/uploadController");
const multer = require("multer");
const path = require("path");
const verifyToken=require("../middlewares/auth");
const { v4: uuidv4 } = require("uuid");

const storage=multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, path.join(__dirname,"../images"));
    },
    filename: (req,res,cb)=>{
        const uniqueName = uuidv4()+path.extname(res.originalname);
        cb(null, uniqueName);
    }
})

const upload = multer({ storage });
router.post("/new", verifyToken, upload.single("image"), PhotoUpload);
//Replace ảnh là phương thức put
router.put('/edit/:id',verifyToken,upload.single("image"),editPhoto);

module.exports=router;