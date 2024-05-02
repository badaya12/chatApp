import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) =>{
    const { newMessage } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(()=>{
        const getMessages = async()=>{
            const response = await getRequest(`${baseUrl}/messages/getMessages/${chat?._id}`);

            if(response.error){
                return console.log("Error getting messages",response);
            }
            const lastMessage = response[response?.length - 1];
            setLatestMessage(lastMessage);
        };
        getMessages();
    },[chat, newMessage]);

    return {latestMessage};
};