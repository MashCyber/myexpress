const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is a must!!"]
    },
    body:{
        type: String,
        required: [true,"Body is a must!!"]
    }
})

const Post = mongoose.model('Post',postSchema)
module.exports = Post;