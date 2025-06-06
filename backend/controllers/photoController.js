const Photo = require('../models/photoModel');
const User = require ('../models/userModel');
const fs = require("fs");
const path = require("path");
const getPhotoById = async (req, res) => {
    const photos=await Photo.find({user_id:req.params.id}).lean().exec();
    for (const photo of photos){
        for (const comment of photo.comments){
            const user=await User.findById(comment.user_id).exec();
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
    //do định nghĩa route là /:photo_id
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
    //1. Lấy ra photoId và userId
    //Do định nghĩa route là /:id
    const photoId=req.params.id;
    const userId=req.user.id;
    //2. Try catch tìm photoId và xóa
    try{
        const photo=await Photo.findById(photoId);
        //Không có photo in ra lỗi
        if (!photo){
            return res.status(404).json({error:"Could not find photo"});
        }
        //photo.user_id khác userId cũng in ra lỗi là chưa đăng nhập
        //ĐM phải covert lại về string vì user._id là object, hay lắm thg chó DTĐ
        if (photo.user_id.toString() !== userId){
            return res.status(404).json({error:"Unauthorized"});
        }
        //Xóa luôn file vật lý trong thư mục(tùy)
        const imagePath=path.join(__dirname,"../images",photo.file_name);
        fs.unlink(imagePath,(err)=>{
            if(err) console.log("Could not delete photo",err.message);
        });

        //Xóa document trong MongDB : thì phải là thằng Photo vì nó lấy dữ liệu từ model, má code lại thôi cx sai
        await Photo.findByIdAndDelete(photoId);
        return res.status(200).json({message:"Successfully deleted photo"});
    }
    catch(err){
        console.error("❌ Error deleting photo:", err);
        return res.status(500).json({ error: "Server error" });
    }
};

const deleteComment = async (req, res) => {
    const {photo_id,comment_id} = req.params;
    const userId=req.user.id;
    try{
        const photo= await Photo.findById(photo_id);
        if (!photo) return res.status(404).json({error:"Could not find photo"});
        const comment=photo.comments.id(comment_id);
        if (!comment) return res.status(404).json({error:"Could not find comment"});
        if (comment.user_id.toString() !== userId){
            return res.status(403).json({error:"Unauthorized"});
        }
        photo.comments.pull(comment_id);
        await photo.save();
        return res.status(200).json({message : "Successfully deleted comment"})
    }
    catch(err){
        console.log("❌ Error deleting comment:", err);
        return res.status(500).json({ error: "Server error while deleting comment" });
    }
}

const editComment = async (req, res) => {
    const { photo_id, comment_id } = req.params;
    const { comment: newContent } = req.body;
    const userId = req.user.id;

    try {
        const photo = await Photo.findById(photo_id);
        if (!photo) return res.status(404).json({ error: "Photo not found" });

        const comment = photo.comments.id(comment_id);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        if (comment.user_id.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        comment.comment = newContent;
        comment.date_time = new Date();

        await photo.save();

        return res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (err) {
        console.error("❌ Error updating comment:", err);
        return res.status(500).json({ error: "Server error while editing comment" });
    }
};

module.exports={getPhotoById,getComment,deletePhoto,deleteComment,editComment};