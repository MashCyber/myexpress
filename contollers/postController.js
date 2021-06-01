//CRUD Operations here
const Post = require('../models/postModels')

exports.getAllPosts = async (req,res,next) =>{
    try {
        const posts = await Post.find()
        res.status(200).json({
            status:"Success",
            results:posts.length,
            data:{
                posts
            }
        })
    } catch (e) {
       console.log(e) 
       res.status(400).json({
           status:"Error",
           message:"Posts Not Found!"
       })
    }
}

exports.getOnePost = async(req,res,next) =>{
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        res.status(200).json({
            status:"Success",
            data:{
                post
            }
        })
    } catch (e) {
        console.log(e) 
        res.status(400).json({
            status:"Error",
            message:"Posts Not Found!"
        })
    }
}

exports.createPost = async (req,res,next) =>{
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status:"Suucess",
            data:{
                post
            }
        })
        
    } catch (e) {
        console.log(e) 
        res.status(400).json({
            status:"Error",
            message:"Posts Not Found!"
        })
     }
}

exports.updatePost = async (req,res,next ) =>{
       try {
        const {id}= req.params;
        const post = await Post.findByIdAndUpdate(id,req.body)
        res.status(200).json({
           status:"Sucess",
           data:{
               post
           }
       })
       } catch (e) {
        console.log(e) 
        res.status(400).json({
            status:"Error",
            message:"Posts Update Not Found!"
        })
     }
}

exports.deletePost = async (req,res,next) =>{
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json({
            status:"Success",
            message:"Post Deleted!!"
        })
    } catch (e) {
        console.log(e) 
        res.status(400).json({
            status:"Error",
            message:"Posts Delete Not Found!"
        })
    }

}

exports.deleteAllPosts = async (req,res,next) =>{
    try {
        const posts = Post.find();
        if(post.length){
            const delPosts = await Post.deleteMany();
            res.status(200).json({
                status:"Success",
                message:"All Posts Deleted!"
            })
        }
    } catch (e) {
        console.log(e)
    }
}