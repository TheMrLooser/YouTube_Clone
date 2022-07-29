const express =require("express");
const dotenv = require("dotenv")
const ConnectDB = require("./DB/connection")
const UserRoutes = require("./routes/userRoute.js")
const authRoutes = require("./routes/authRouter.js")
const commentRoutes = require("./routes/commentRout.js")
const videoRoutes = require("./routes/videoRoute.js");
const cookieParser = require("cookie-parser");

const App = express();
App.use(express.json());
dotenv.config({path:"config/config.env"})

App.use(cookieParser())
App.use("/api/users",UserRoutes)
App.use("/api/users",authRoutes)
App.use("/api",videoRoutes)
App.use("/api/users",commentRoutes)
App.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something is wrong!";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})
ConnectDB()

App.listen(process.env.PORT,()=>{
    console.log("connected!")
}) 