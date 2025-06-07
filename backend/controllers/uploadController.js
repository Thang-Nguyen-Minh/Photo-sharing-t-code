const Photo = require("../models/photoModel");
const path = require("path");
const fs = require("fs");

const PhotoUpload = async (req, res) => {
    if (!req.file) return res.status(400).json({error: "file not found"});
    try{
        const newPhoto = new Photo({
            user_id: req.user.id,
            file_name: req.file.filename,
            date_time: new Date(),
            comments: [],
        })
        await newPhoto.save();
        res.status(201).json({
            message: "Photo uploaded successfully",
            photo: newPhoto
        })
    }
    catch(err){
        console.log("upload error:", err);
        res.status(500).json({error: "error occured"});
    }
}

const editPhoto = async (req, res) => {
    const photoId=req.params.id;
    const userId=req.user.id;

    try{
        const photo = await Photo.findById(photoId);
        if (!photo){
            return res.status(404).json({error:"Could not find photo"});
        }
        if (photo.user_id.toString() !== userId){
            return res.status(404).json({error:"Unauthorized"});
        }
        const imagePath=path.join(__dirname,"../images",photo.file_name);
        fs.unlink(imagePath,(err)=>{
            if(err) console.log("Could not delete photo",err.message);
        })
        //Ghi đè file_name
        photo.file_name=req.file.filename;
        await photo.save();

        res.status(200).json({
            message: "Photo updated successfully",
            photo: photo
        });
    }
    catch(err){
        console.log("Could not edit photo",err);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {PhotoUpload,editPhoto}