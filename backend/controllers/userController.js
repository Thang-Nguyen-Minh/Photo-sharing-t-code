const User = require ('../model/userModel');

const getUserList = async (req, res) => {
    const users= await User.find({});
    res.status(200).json(users);
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user=await User.findById(id);
    if (!user) {
        res.status(400).send("User not found");
    }
    res.status(200).json(user);
}
module.exports={getUserList,getUserById};