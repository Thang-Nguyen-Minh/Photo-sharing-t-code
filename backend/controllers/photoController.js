const Photo = require('../models/photoModel');
const User = require ('../models/userModel');
const fs = require("fs");
const path = require("path");
const getPhotoById = async (req, res) => {
    const photos=await Photo.find({user_id:req.params.id}).lean().exec();
    for (const photo of photos){
        for (const comment of photo.comments){
            const user=await User.findById(comment.user_id,).exec();
            comment.user=user;
        }
    }
    return res.status(200).json(photos);
}

const getComment = async (req, res) => {
    console.log("✅ req.body.comment:", req.body.comment);
    console.log("✅ req.params.photo_id:", req.params.photo_id);
    console.log("✅ req.user:", req.user); // hoặc req.userId
    const {comment} = req.body;
    const photoId=req.params.photo_id;
    if (!comment || comment.trim()===""){
        return res.status(400).json({error:"Comment not found."});
    }
    try{
        const photo=await Photo.findById(photoId);
        if (!photo){
            return res.status(404).json({error:"Could not find photo"});
        }
        const newComment={
            comment,
            user_id: req.user.id,
            date_time: new Date(),
        }
        photo.comments.push(newComment);
        await photo.save();
        return res.status(200).json(photo);
    }
    catch(err){
        return res.status(404).json({error:"Could not find photo"});
    }
}

const deletePhoto = async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user.id;

    try {
        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
        }

        if (photo.user_id.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        // Xóa file vật lý trong thư mục /images (tuỳ chọn)
        const imagePath = path.join(__dirname, "../images", photo.file_name);
        fs.unlink(imagePath, (err) => {
            if (err) console.log("⚠️ Could not delete file:", err.message);
        });

        // Xóa document trong MongoDB
        await Photo.findByIdAndDelete(photoId);

        return res.status(200).json({ message: "Photo deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting photo:", err);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports={getPhotoById,getComment,deletePhoto};