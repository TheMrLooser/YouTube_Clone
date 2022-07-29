const createError = require("../middlewhare/error.js");
const userSchema = require("../model/UserModel.js");
const VideoSchema = require("../model/VideoSchema.js");


const update = async (req,res,next)=>{
   if(req.params.id === req.user.id){
    try {
        const updateUser = await userSchema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
   } else{
    return next(createError(403,"You can't update this account"))
   } 
}

const logout = async (req,res,next)=>{
    res.cookie("access_token",null,{
        expires : new Date(Date.now()),
        httpOnly:true

    });
    res.status(200).json({success:true,message:"Logged Out"})
}

const deleteUser = async (req,res,next)=>{

    if(req.params.id === req.user.id){
        try {
             await userSchema.findByIdAndDelete(req.params.id);
             res.status(200).json({success:true,message:"Account deleted"})
        } catch (error) {
            next(error)
        }
       } else{
        return next(createError(403,"You can't delete this account"))
       }
}
   

const like = async(req,res,next)=>{
    const videoId = req.params.id;
    const userId = req.user.id;
    
    const Video = await VideoSchema.findById(videoId)
    const user = await userSchema.findById(userId)
    if(Video.dislikes.includes(userId)){
        const pull =  await VideoSchema.findByIdAndUpdate(videoId,{$pull:{dislikes:userId}});
        const push = await VideoSchema.findByIdAndUpdate(videoId,{$push:{likes:userId}})
        if(!user.likedVideo.includes(videoId)){
            const push = await userSchema.findByIdAndUpdate(userId,{$push:{likedVideo:videoId}})
        }
    } 
    if(Video.likes.includes(userId)){
        res.status(401).json({success:false,message:"Already liked"})
    }
    
    if(!Video.likes.includes(userId)){
        const push = await VideoSchema.findByIdAndUpdate(videoId,{$push:{likes:userId}})
        res.status(200).json({success:true,message:"liked"})
        if(!user.likedVideo.includes(videoId)){
            const push = await userSchema.findByIdAndUpdate(userId,{$push:{likedVideo:videoId}})
        }
    }

    
}


const dislike = async(req,res,next)=>{
    const videoId = req.params.id;
    const userId = req.user.id;
    
    const Video = await VideoSchema.findById(videoId)

    if(Video.likes.includes(userId)){
        const pull =  await VideoSchema.findByIdAndUpdate(videoId,{$pull:{likes:userId}});
        const push = await VideoSchema.findByIdAndUpdate(videoId,{$push:{dislikes:userId}})
        
    } 
    if(Video.dislikes.includes(userId)){
        res.status(401).json({success:false,message:"Already disliked"})
    }
    
    if(!Video.dislikes.includes(userId)){
        const push = await VideoSchema.findByIdAndUpdate(videoId,{$push:{dislikes:userId}})
        res.status(200).json({success:true,message:"disliked"})

    }

    
}


const getUser = async (req,res,next)=>{

    try {
        const users =  await userSchema.findById(req.params.id);
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
 
const subscribe = async (req,res,next)=>{
    
}

const unsubscribe = async (req,res,next)=>{
    
}

const savedVideo = async (req,res,next)=>{
    const videoId = req.params.id;
    const userId = req.user.id
    const user  = await userSchema.findById(userId)
    if(user.savedVideo.includes(videoId)){
        await userSchema.findByIdAndUpdate(userId,{$pull:{savedVideo:videoId}})
        res.status(200).json({success:true,message:"Removed"})
    }
    if(!user.savedVideo.includes(videoId)){
        await userSchema.findByIdAndUpdate(userId,{$push:{savedVideo:videoId}})
        res.status(200).json({success:true,message:"saved"})
    }
}



module.exports = {update,unsubscribe,subscribe,getUser,dislike,like,deleteUser , logout ,savedVideo}