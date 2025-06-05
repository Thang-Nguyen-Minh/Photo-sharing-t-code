const User = require('../models/userModel');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
    const {username, password, first_name,last_name,location,description,occupation} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'Username or password is required'});
    }
    let user=await User.findOne({username})
    if(user){
        return res.status(400).json({error: 'username is already in use '});
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({
        username,password : hashedPass,first_name,last_name,location,description,occupation
    })
    let token=jwt.sign({username,id: newUser._id},process.env.JWT_SECRET);
    return res.status(200).json({token,user: newUser});
}

const userLogin = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'Username or password is required'});
    }
    let user = await User.findOne({username});
    if(user && await bcrypt.compare(password,user.password)){
        let token = jwt.sign({username,id: user._id},process.env.JWT_SECRET);
        return res.status(200).json({token,user});
    }
    else return res.status(401).json({error: 'Invalid Credentials'});
}

const userLogout = async (req, res) => {
    // Với JWT, bạn không cần làm gì ở server
    // Nhưng có thể gửi về trạng thái xác nhận
    return res.status(200).json({ message: "User logged out successfully" });
};


module.exports = {userLogin,userLogout,userSignUp};

