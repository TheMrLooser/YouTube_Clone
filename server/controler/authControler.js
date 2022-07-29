const mongoose = require("mongoose");
const userSchema = require("../model/UserModel.js");
const bcrypt = require("bcryptjs");
const createError = require("../middlewhare/error.js");
const jwt = require("jsonwebtoken")


const signup =async (req,res,next)=>{
    try {
        const hash = await bcrypt.hash(req.body.password,10)
        const newUser = new userSchema({...req.body,password:hash})
        await newUser.save();
        res.status(200).send( )
    } catch (error) {
        next(error)
    }
}


const signin =async (req,res,next)=>{
    try {
        const user = await userSchema.findOne({name:req.body.name})
        if(!user) return next(createError(400,"User not found"));
        const isCorrect = await bcrypt.compare(req.body.password,user.password);
        if (!isCorrect) return next(createError(400,"Wrong userName or Password"));

        const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
        res.cookie("access_token",token,{httpOnly:true}).status(200)

        const {password,...others} = user._doc
        res.status(200).send(others);

    } catch (error) {
        next(error)
    }
}

const googleAuth = async (req,res,next)=>{
    try {
        const user = await userSchema.findOne({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
            res.cookie("access_token",token,{httpOnly:true}).status(200).json(user._doc)
        }
        else{
            const newUser = new userSchema({
                ...req.body,
                fromGoogle:true
            });
            const savedUser = await newUser.save()
            const token = jwt.sign({id:savedUser._id},process.env.SECRET_KEY)
            res.cookie("access_token",token,{httpOnly:true}).status(200).json(savedUser._doc)
        }


    } catch (error) {
        next(error)
    }
}


module.exports = {signup , signin , googleAuth}