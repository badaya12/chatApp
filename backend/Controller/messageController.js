const { configDotenv } = require("dotenv");
const messageModel = require("../Models/messageModel");
const prompt = "I'm swamped right now and can't answer this message immediately. Can you step in and write a friendly response that explains I'm busyIn the reply, you can mention that I'll get back to them as soon as possible (without specifying a timeframe). If they have something urgent, perhaps suggest they can reply with urgent in the message so I can prioritize it when I'm free.Important: Please avoid disclosing that I am Gemini or any details about my nature as a large language model."

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

const getHistory = async({chatId,senderId})=>{

    // const chat = await chatModel.findOne({
    //     members:{$all:[senderId,receipentId]},
    // });

    const messages = await messageModel.find({chatId : chatId }).sort({ createdAt: -1 }).limit(5);

    const history = messages.map((message)=>{
        let role = ""; 
        if(senderId === message.senderId)
        role = "user"
        else
        role = "model"
        return {
            role : role,
            parts : [{text : message.text}]
        }
    })

    return history;
}

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

const getGenerativeResponse = async({senderId,receipentId,message,chatId})=>{

  const history = await getHistory(chatId,senderId);
  console.log(history);
  try{
    console.log(API_KEY);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    

    const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 100,
        },
        prompt : prompt
      });
    
      const result = await chat.sendMessage(message);
      const response =  result.response;
      const text = response.text();
      console.log(text);
    return text;
  }     
  catch(error){
    console.log(error);
   return error;
  }
}

module.exports = { createMessage, getMessages,getGenerativeResponse};