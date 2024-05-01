const express = require("express");
const {createChat,findChat,findChatByUser} = require("../Controller/chatController");

const router = express.Router();
router.post("/createChat",createChat);
router.get("/find/:userId",findChatByUser);
router.get("/find/:firstId/:secondId",findChat);
module.exports = router;