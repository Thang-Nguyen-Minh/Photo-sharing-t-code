const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    location:String,
    description:String,
    occupation:String,
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});
module.exports=mongoose.model.User || mongoose.model("User",userSchema);