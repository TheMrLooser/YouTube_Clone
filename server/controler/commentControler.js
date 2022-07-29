const createError = require("../middlewhare/error.js");
const CommentSchema = require("../model/comment.js")
const VideoSchema = require("../model/VideoSchema.js")


const addComment  = async (req,res,next)=>{
    const newComment = new CommentSchema({...req.body,userId:req.user.id});
    try {
        const saveComment = await newComment.save();
        res.status(200).json(`comment added successfuly`)
    } catch (error) {
        next(error)
    }
}

 
const deleteComment  = async (req,res,next)=>{
     
    try {
        const  comment = await CommentSchema.findById(req.params.id)
        const  userId =  req.user.id;
        const commentId = req.params.id;
        const videoId = comment.videoId
        const video = await VideoSchema.findById(videoId) 
        if(comment.userId===userId  ){
            await CommentSchema.findByIdAndDelete(commentId)
            
        }
        else{
            return next(createError(403,"You can delete only your posted comments"))
        }

        res.status(200).json("comment deleted")
        
        res.status(200).json(`comment added successfuly`)
    } catch (error) {
        next(error)
    }
}


const getComment  = async (req,res,next)=>{
     
    try {
        const getComment = await  CommentSchema.find({videoId:req.params.videoId})
        res.status(200).json(getComment)
    } catch (error) {
        next(error)
    }
}

module.exports = {addComment , deleteComment , getComment};