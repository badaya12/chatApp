const { configDotenv } = require("dotenv");
const messageModel = require("../Models/messageModel");

// node --version # Should be >= 18
// npm install @google/generative-ai
require("dotenv").config()
const {
    GoogleGenerativeAI
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = process.env.API_KEY;
  

const createMessage = async(req,res) =>{
    const { chatId, senderId, text } = req.body;
    const message = new messageModel({
        chatId,
        senderId,
        text
    });
    try{
        const response = await message.save();
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.staus(500).json(error);
    }
};


//getMessages

const getMessages = async(req,res)=>{
    const {chatId} = req.params;
    try{
        const messages = await messageModel.find({
            chatId
        });
        res.status(200).json(messages);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const getGenerativeResponse = async(req,res)=>{
  const {history,userMessage} = req.body;
  console.log(history);
  try{
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    

    const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 100,
        },
      });
    
      const result = await chat.sendMessage(userMessage);
      const response =  result.response;
      const text = response.text();
      console.log(text);
    return res.status(200).json(response);
  }     
  catch(error){
    res.status(500).json(error);
  }
}

module.exports = { createMessage, getMessages,getGenerativeResponse};