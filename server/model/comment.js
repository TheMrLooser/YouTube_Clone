const mongoose = require("mongoose");
const validator = require("validator")

const CommentSchema = new mongoose.Schema({
    userId:{
        required:true,
        type:String, 
    },
    videoId:{
        required:true,
        type:String, 
    },
    comment:{
        required:true,
        type:String, 
    }, 
     
    
     



},{timestamps:true});


module.exports= mongoose.model("Comment",CommentSchema)