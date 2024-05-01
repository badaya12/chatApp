const express = require("express");
const { registerUser, loginUser, findUser,getUsers ,verifyToken,changeStatus} = require("../Controller/userController");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.post("/changeStatus",changeStatus)
module.exports = router;