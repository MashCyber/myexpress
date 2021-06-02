const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required!!"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required!!"]
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User;