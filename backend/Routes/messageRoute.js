const express = require("express");
const {createMessage,getMessages,getGenerativeResponse} = require("../Controller/messageController")
const router = express.Router();

router.get("/getMessages/:chatId",getMessages);
router.post("/createMessages/",createMessage);
router.post("/getGenerativeResponse",getGenerativeResponse);

module.exports = router;