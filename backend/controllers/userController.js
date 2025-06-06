const User = require ('../models/userModel');

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

const updateUser = async (req, res) => {
    const userIdFromToken = req.user.id;         // ✅ từ verifyToken
    const userIdFromParam = req.params.id;

    if (userIdFromToken !== userIdFromParam) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const { first_name, last_name, location, description, occupation } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userIdFromParam,
            { first_name, last_name, location, description, occupation },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports={getUserList,getUserById,updateUser};