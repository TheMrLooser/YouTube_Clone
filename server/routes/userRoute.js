const  { savedVideo, update, deleteUser, like, dislike, subscribe, unsubscribe, getUser, logout}  =  require("../controler/userControler.js");
const { sendSavedVideo } = require("../controler/videoControler.js");
const isAuthenticated = require("../middlewhare/jwt.js");

const express = require("express");

const router = express.Router();

router.put("/:id",isAuthenticated, update);
router.get("/logout/:id",isAuthenticated, logout);
router.delete("/delete/:id",isAuthenticated,deleteUser);
router.put("/like/:id",isAuthenticated, like);
router.put("/dislike/:id",isAuthenticated,dislike);
router.put("/sub/:videoId",isAuthenticated,subscribe);
router.put("/unsub/:videoId",isAuthenticated,unsubscribe);
router.put("/save/:id",isAuthenticated,savedVideo);
router.get("/find/:id",getUser);
router.get("/saved",isAuthenticated, sendSavedVideo)

module.exports =  router;