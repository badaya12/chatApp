const express = require("express");
const {createMessage,getMessages} = require("../Controller/messageController")
const router = express.Router();

router.get("/getMessages/:chatId",getMessages);
router.post("/createMessages/",createMessage);

module.exports = router;