import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
// import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat , user }) => {
    const { recipientUser } = useFetchRecipientUser(chat,user);
    const { onlineUsers} = useContext(ChatContext);
    const {latestMessage} = useFetchLatestMessage(chat);
    const isOnline = onlineUsers?.some((user)=>user?.userId === recipientUser?._id); 
    
    //console.log(recipientUser);

    const truncateText = (text)=>{
        let shortText = text.substring(0,20);
        if(text.length > 20){
            shortText += "...";
        }
        return shortText;
    };

    return (
    <Stack direction="horizontal" gap={3} className="user-card aligin-items-center p-2 justify-content-between" role="button" style={{cursor:"pointer",borderRadius:"0.5rem"}}>  
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} height="35px"/>
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">{latestMessage?.text && (<span>{truncateText(latestMessage?.text)}</span>)}</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <span className={isOnline?"user-online":""}></span>
        </div>
    </Stack>
    );
};
 
export default UserChat;