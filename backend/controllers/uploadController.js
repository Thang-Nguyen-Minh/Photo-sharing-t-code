const Photo = require("../models/photoModel");

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
module.exports = {PhotoUpload}