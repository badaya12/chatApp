const chatModel = require("../Models/chatModel");

const createChat = async(req,res)=>{
    try{
        const {firstId,secondId} = req.body;
        const chat = await chatModel.findOne({
            members:{$all:[firstId,secondId]},
        });
        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members:[firstId,secondId],
        });
        
        const response = await newChat.save();

        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findChatByUser = async(req,res)=>{
    try{
        const id = req.params.userId;
        const chat = await chatModel.find({
            members : {$in : id}
        })

        return res.status(200).json(chat);
    }
    catch(e){
        return res.json(e);
    }
}

const findChat = async(req,res)=>{
    try{
        const {firstID,secondID} = req.body;
        const chat = await chatModel.findOne({
            members:{$all:[firstID,secondID]},
        });
        if(chat) return res.status(200).json(chat);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
}

 module.exports = {createChat,findChatByUser,findChat}   
