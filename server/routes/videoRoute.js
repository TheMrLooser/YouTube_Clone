const  { sendSavedVideo, addVideo, updateVideo, randomVideo, deleteVideo, addView, getVideo, trend, subscribed, search, getByTags }  =  require("../controler/videoControler.js");
const isAuthenticated = require("../middlewhare/jwt")

const express = require("express");

const router = express.Router();

router.post("/video",isAuthenticated, addVideo)
router.put("/video/upsate/:id",isAuthenticated, updateVideo)
router.get("/video/random",randomVideo)
router.delete("/video/delete/:id",isAuthenticated, deleteVideo)
router.put("/video/addview/:id",addView)
router.get("/video/:id",getVideo)
router.get("/video/new/trend",trend)
router.put("/video/subscribe/:id", isAuthenticated, subscribed) 
router.get("/videos/search",search)
router.get("/videos/tags",getByTags)
 

module.exports =  router;