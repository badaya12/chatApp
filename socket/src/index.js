const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();
let onlineUsers = [];

const io = new Server({ cors: [process.env.FRONTEND_URL,process.env.BACKEND_URL] });//this step is done because our server and client are running on different domain
mongoose.connect(process.env.DATABASE_URL,()=>{
    console.log("connection of socket server to mongoDb ins established");
});

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
 
  socket.on("sendMessage",(message)=>{
    const user = onlineUsers.find((user) => user.userId === message.recipientId);
    if(user){
      io.to(user.socketId).emit("getMessage",message);
    }
    else{
        
        axios.post("http://localhost:5001/api/messages/getGenerativeResponse",{message});
    }
  });

  //listen to a disconnection
  socket.on("disconnect",()=>{
    onlineUsers = onlineUsers.filter((user)=> user.socketId !== socket.id);
    io.emit("getOnlineUsers",onlineUsers);
  });
});

io.listen(5001,()=>{
    console.log("listening to this port")
});