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
module.exports={getPhotoById};