
const express = require("express");
const {addComment, deleteComment, getComment } = require("../controler/commentControler.js");
const isAuthenticated = require("../middlewhare/jwt.js")
const router = express.Router();

router.post("/comments",isAuthenticated,   addComment)
router.delete("/comments/delete/:id", isAuthenticated, deleteComment)
router.get("/comments/:videoId",getComment)

module.exports =  router;  