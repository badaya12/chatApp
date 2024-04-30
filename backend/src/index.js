const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("../Routes/userRoute");
const chatRoute = require("../Routes/chatRoute")
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoute);
app.use("/api/chats",chatRoute);

const port = 5001;
const uri = process.env.DATABASE_URL;

console.log(uri);

app.listen(port,()=>{
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