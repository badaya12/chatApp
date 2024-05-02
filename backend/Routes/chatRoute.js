const express = require("express");
const {createChat,findChat,findChatByUser} = require("../Controller/chatController");
const {verifyToken} = require("../Controller/userController")

const router = express.Router();
router.post("/createChat",verifyToken,createChat);
router.get("/find/:userId",verifyToken,findChatByUser);
router.get("/find/:firstId/:secondId",verifyToken,findChat);
module.exports = router;