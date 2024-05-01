const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatId: {type : mongoose.Schema.Types.ObjectId,ref:"chats"},
    senderId: {type : mongoose.Schema.Types.ObjectId,ref:"users"},
    text: String
},{timestamps:true});

const messageModel = mongoose.model("Message",messageSchema);

module.exports = messageModel;