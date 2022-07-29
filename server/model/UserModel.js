const mongoose = require("mongoose");
const validator = require("validator")

const UserSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        minLength:4,
        unique:true

    },
    email:{
        type:String,
        required:true,
        validate:validator.isEmail,
        unique:true
    },
    password:{
        type:String,
        // required:true
    },
    img:{
        type:String
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUser:{
        type:[String]
        
    },
    subscribedChannels:{
        type:[String]
    },
    fromGoogle :{
        type:Boolean,
        default:false,
    }
     



},{timestamps:true});


module.exports =  mongoose.model("User",UserSchema)