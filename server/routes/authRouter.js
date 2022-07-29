const  { signup, signin, googleAuth }  =  require("../controler/authControler.js");

const express = require("express")

const router = express.Router();

// Creating a user
router.post("/signup", signup);

// sign in 
router.post("/signin",signin);

// google sign in
router.post("/auth/google", googleAuth)

module.exports =  router;