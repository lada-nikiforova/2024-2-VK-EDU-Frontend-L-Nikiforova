import React from 'react';
import './ChatList.scss';
import { Link } from 'react-router-dom';



const ChatList = ({chat, onChatClick}) => {
    // const getLastMessage = (chatId) => {
    //     const messages = JSON.parse(localStorage.getItem(chatId)) || [];
    //     if (messages.length > 0) {
    //         const lastMessage = messages[messages.length - 1];
    //         return {
    //             message: lastMessage.message_a,
    //             time: lastMessage.time_a,
    //         };
    //     }
    //     return {
    //         message: 'Сообщений нет',
    //         time: '',
    //     };
    // };
    return (
        <div className="list">
            {chat.map(button=>{
                return(
                <Link to= {`/chat/${button.id}`} key={button.id} id={button.id} className='container-button-chat' onClick={()=>{onChatClick(button.id, button.title);}}>
                    <div className="container-img"><img className="chat-img" src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
                    <div className="chat-info">
                        <div className="chat-name">{button.title}</div>
                        <div className="chat-message">{button.lastMessage}</div>
                    </div>
                    <div className="chat-time">{new Date(button.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </Link>   
            )})
            }
            
        </div>
    );
}

export default ChatList;