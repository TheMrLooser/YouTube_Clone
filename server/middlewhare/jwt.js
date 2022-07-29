const jwt = require("jsonwebtoken");
const createError = require("./error");


const isAuthenticated = (req, res, next)=>{
const token = req.cookies.access_token;
if(!token) return next(createError(401,"Login First"));
jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
    if(err) return next(createError(403,"Cookie expired"))
    req.user = user;
    next()
})
}

module.exports = isAuthenticated;