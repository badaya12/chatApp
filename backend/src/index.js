const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("../Routes/userRoute");
const chatRoute = require("../Routes/chatRoute");
const messageRoute = require("../Routes/messageRoute");
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const userModel = require("../Models/userModel");
const { getGenerativeResponse, getMessages } = require("../Controller/messageController");
const messageModel = require("../Models/messageModel");
const server = http.createServer(app);
require("dotenv").config();
const io = new Server(server,{
    cors:{
        origin : process.env.FRONTEND_URL,
        methods : ["GET","POST"]
    }
});
//websocket and express server both running on same port

//middleware
app.use(express.json());
app.use(cors({
    origin : process.env.FRONTEND_URL
}));
const standardMessage = "I'll be here with you shortly";
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//different
app.use("/api/users",userRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);

const port = 5001;
const uri = process.env.DATABASE_URL;

let onlineUsers = [];
//users that are online are stored in this pool and when they it goes offline it is removed from there itself

io.on("connection", (socket) => {
  console.log("New Connection",socket.id);

  //listen to a connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user)=>{
        user.userId === userId
    })&&
    onlineUsers.push({userId,socketId:socket.id});
    console.log("onlineUsers",onlineUsers);
    io.emit("getOnlineUsers",onlineUsers);
  });
 
  socket.on("sendMessage",async(message)=>{
    const user = onlineUsers.find((user) => user.userId === message.recipientId);
    if(user){
      io.to(user.socketId).emit("getMessage",message);
    }
    else
    {//if the recipient is busy and offline then generative response will be generated 
      const receipent = await userModel.findOne({_id : message.recipientId})
      if(receipent.status === "BUSY")
       {let response;
      
        try {
            response = await Promise.race([
                getGenerativeResponse({
                    senderId: message.senderId,
                    receipentId: message.recipientId,
                    message: message.text,
                    chatId: message.chatId
                }),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(standardMessage);
                    }, 10000); // 10 seconds timeout
                })
            ]);
        } catch (error) {
            response = standardMessage; // Handle error if getGenerativeResponse fails
        }

        const newMessage = new messageModel({
            text : response,
            senderId : message.recipientId,
            chatId : message.chatId
        });

        const savedDocs = await newMessage.save();
    io.to(socket.id).emit("getMessage",savedDocs);}}
  });

  //listen to a disconnection
  socket.on("disconnect",()=>{
    onlineUsers = onlineUsers.filter((user)=> user.socketId !== socket.id);
    io.emit("getOnlineUsers",onlineUsers);
  });
});



server.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})

mongoose.connect(uri,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Mongodb connection established")
}).catch((error)=>{
    console.log("Mongodb connection failed: ",error.message);
})