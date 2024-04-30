const express = require("express");
const {createChat} = require("../Controller/chatController");

const router = express.Router();
router.post("/createChat",createChat);

module.exports = router;