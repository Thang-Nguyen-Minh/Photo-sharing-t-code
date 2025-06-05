const Photo = require('../models/photoModel');
const User = require ('../models/userModel');
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
module.exports={getPhotoById,getComment};