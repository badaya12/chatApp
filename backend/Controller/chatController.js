const chatModel = require("../Models/chatModel");

const createChat = async(req,res)=>{
    try{
        console.log(req.body);
        const {firstID,secondID} = req.body;
        const chat = await chatModel.findOne({
            members:{$all:[firstID,secondID]},
        });
        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members:[firstID,secondID],
        });
        
        const response = await newChat.save();

        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};


 module.exports = {createChat}   
