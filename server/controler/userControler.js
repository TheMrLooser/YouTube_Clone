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
     


const like = (req,res,next)=>{
     
}

const dislike = (req,res,next)=>{
     
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
     try {
        const getVideo = await VideoSchema.findById(req.params.videoId)
         
        const getuser = await userSchema.findById(req.body.userId)
         
        await userSchema.findOneAndUpdate(getVideo._id,{$push :{subscribedUser:req.user.id}});
        await userSchema.findOneAndUpdate( getVideo._id,{$inc:{subscribers:1}})
        await
        res.status(200).json({success:true,message:"subscribed"})
     } catch (error) {
        next(error)
     }
}

const unsubscribe = async (req,res,next)=>{
    try {
        await userSchema.findOneAndUpdate(req.params.id,{$pull :{subscribedUser:req.params.id}});
        await userSchema.findOneAndUpdate(req.params.id,{$inc:{subscribers:-1}})
        res.status(200).json({success:true,message:"unsubscribed"})
     } catch (error) {
        next(error)
     }
}




module.exports = {update,unsubscribe,subscribe,getUser,dislike,like,deleteUser , logout}