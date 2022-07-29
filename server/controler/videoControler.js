const createError = require("../middlewhare/error.js");
const userSchema = require("../model/UserModel.js")
const videoSchema = require("../model/VideoSchema.js");

const addVideo = async (req,res,next)=>{
     const newVideo = await videoSchema({userId:req.user.id,...req.body});
     try {
        const savedVideo = await newVideo.save( );
        res.status(200).json(savedVideo)
     } catch (error) {
        next(error)
     }
}

const updateVideo = async (req,res,next)=>{
    try {
        const video = await videoSchema.findById(req.params.id );
        if (!video) return next(createError(404,"Video Not Found"));
        if(req.user.id=== video.userId){
            const updatevideo = await videoSchema.findOneAndUpdate(req.params.id,{$set:req.body},{new:true})

            res.status(200).json(updatevideo)
        }else{
            return next(createError(403,"You cant update this video"))
        }
    } catch (error) {
       next(error)
    }
}

const deleteVideo = async (req,res,next)=>{
    try {
        const video = await videoSchema.findById(req.params.id );
        if (!video) return next(createError(404,"Video Not Found"));
        if(req.user.id=== video.userId){
            await videoSchema.findByIdAndDelete(req.params.id)

            res.status(200).json( "Video is deleted")
        }else{
            return next(createError(403,"You cant update this video"))
        }
    } catch (error) {
       next(error)
    }
}

const getVideo = async (req,res,next)=>{
    try {
        const video = await videoSchema.findById(req.params.id );
         res.status(200).json(video)
    } catch (error) {
       next(error)
    }
}

const addView = async (req,res,next)=>{
    try {
      
        const video = await videoSchema.findById(req.params.id)
        if (!video) return next(createError(404,"vodeo not  found"))
        const changeView = video.views + 1
        await videoSchema.updateOne({views:changeView })
         res.status(200).json( video)
    } catch (error) {
       next(error)
    }
}

const randomVideo = async (req,res,next)=>{
    try {
        const videos =  await videoSchema.aggregate([{$sample:{size:20}}])
         res.status(200).json( videos)
    } catch (error) {
       next(error)
    }
}

const trend = async (req,res,next)=>{
    try {
        const videos =  await videoSchema.find().sort({views:-1});
         res.status(200).json(videos)
    } catch (error) {
       next(error)
    }
}

const subscribed = async (req,res,next)=>{
    try {

        // for channel subscribedUser
        const userId = req.user.id
        const channelId = req.params.id
        const channelUser = await userSchema.findById(channelId);
        const user = await userSchema.findById(userId);
        if(channelUser.subscribedUser.includes(user.id)){ 
                next( createError(400,"Allready Subscribed"))
            }
        else {
            // channel side 
            const channelSubscribedUser =   await userSchema.findByIdAndUpdate(channelId,{$push :{subscribedUser:[userId]} },{new:true});
            const  channelSubscriber  =  await userSchema.findByIdAndUpdate(channelId ,{$set:{subscribers:channelUser.subscribedUser.length +1}} );
            
            // user side
            const subscribedChannels =  await userSchema.findByIdAndUpdate(userId,{$push:{subscribedChannels:[channelId]}})
        }
 
        res.status(200).json("Subscribed")
        
    } catch (error) {
       next(error)
    }
} 


const getByTags = async (req,res,next)=>{
    const tags = req.query.tags.split(",")
    try { 
        const video =  await videoSchema.find( {tags:{$in:tags}}).limit(20);
         
         res.status(200).json(video)
    } catch (error) {
       next(error)
    }
}

const search = async (req,res,next)=>{
    const query = req.query.q;
    try {
        const video =  await videoSchema.find({tital:{$regex:query,$options:"i"}}).limit(40);
        if(!video == []){
            next(createError(404,"NO video related to your query"))
        }
         res.status(200).json( video)
    } catch (error) {
       next(error)
    }
} 

module.exports = {addVideo , search ,updateVideo,getByTags ,getVideo,subscribed,trend,randomVideo,addView,deleteVideo }