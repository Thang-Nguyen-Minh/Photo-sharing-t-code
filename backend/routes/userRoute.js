const express=require('express');
const router=express.Router();
const {getUserList,getUserById} =  require("../controllers/userController");
const verifyToken=require("../middlewares/auth");
router.get('/me', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await require('../models/userModel').findById(userId).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/list',verifyToken,getUserList);
router.get('/:id',verifyToken,getUserById);

module.exports=router;