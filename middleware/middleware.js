exports.isLoggin = async(req,res,next) =>{
    const { user } = req.session
    if(!user){
        return res.status(400).json({
            status:"Error",
            message:"Please Login to continue..."
        })
    }  
    next();
}