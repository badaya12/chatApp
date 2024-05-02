const express = require("express");
const {createMessage,getMessages} = require("../Controller/messageController");
const {verifyToken} = require("../Controller/userController")
const router = express.Router();

router.get("/getMessages/:chatId",verifyToken,getMessages);
router.post("/createMessages/",verifyToken,createMessage);


module.exports = router;