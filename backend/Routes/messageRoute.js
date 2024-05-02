const express = require("express");
const {createMessage,getMessages,getGenerativeResponse} = require("../Controller/messageController");
const {verifyToken} = require("../Controller/userController")
const router = express.Router();

router.get("/getMessages/:chatId",verifyToken,getMessages);
router.post("/createMessages/",verifyToken,createMessage);
router.post("/getGenerativeResponse",verifyToken,getGenerativeResponse);

module.exports = router;