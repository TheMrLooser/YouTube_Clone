const mongoose = require("mongoose");
const validator = require("validator")

const VideoSchema = new mongoose.Schema({
    userId:{
        required:true,
        type:String, 
    },
    tital:{
        required:true,
        type:String, 
    },
    desc:{
        required:true,
        type:String, 
    }, 
    imgUrl:{
        required:true,
        type:String, 
    },
    videoUrl:{
        required:true,
        type:String, 
    },
    views:{
        type:Number, 
        default:0,
    },
    likes:{
        type : [Number],
        default:0
    },
    tags:{
        type : [String],
        default:[]

    },
    dislikes:{
        type : [Number],
        default:0
    },
    
     



},{timestamps:true});


module.exports =  mongoose.model("Video",VideoSchema)