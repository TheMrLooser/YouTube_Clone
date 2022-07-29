const  {  update, deleteUser, like, dislike, subscribe, unsubscribe, getUser, logout}  =  require("../controler/userControler.js");

const express = require("express");
const isAuthenticated = require("../middlewhare/jwt.js");

const router = express.Router();

router.put("/:id",isAuthenticated, update);
router.get("/logout/:id",isAuthenticated, logout);
router.delete("/delete/:id",isAuthenticated,deleteUser);
router.put("/:id",isAuthenticated, like);
router.put("/:id",isAuthenticated,dislike);
router.put("/sub/:videoId",isAuthenticated,subscribe);
router.put("/unsub/:videoId",isAuthenticated,unsubscribe);
router.get("/find/:id",getUser);

module.exports =  router;