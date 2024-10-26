import React from 'react';
import './ChatList.scss';



const ChatList = ({chat, onChatClick}) => {
    const getLastMessage = (chatId) => {
        const messages = JSON.parse(localStorage.getItem(chatId)) || [];
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            return {
                message: lastMessage.message_a,
                time: lastMessage.time_a,
            };
        }
        return {
            message: 'Сообщений нет',
            time: '',
        };
    };
    return (
        <div className="list">
            {chat.map(button=>{
                const { message, time } = getLastMessage(button.id);
                return(
                <button key={button.id} id={button.id} className='container-button-chat' onClick={()=>{onChatClick(button.id, button.name);}}>
                    <div className="container-img"><img className="chat-img" src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
                    <div className="chat-info">
                        <div className="chat-name">{button.name}</div>
                        <div className="chat-message">{message}</div>
                    </div>
                    <div className="chat-time">{time}</div>
                </button>
            )})
            }
            
        </div>
    );
}

export default ChatList;