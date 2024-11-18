import React from 'react';
import './ChatList.scss';
import { Link } from 'react-router-dom';
import  defaultAvatar from '../../assets/avatar.png'


const ChatList = ({chat, onChatClick}) => {
    return (
        <div className="list">
            {chat.map(button=>{
                return(
                <Link to= {`/chat/${button.id}`} key={button.id} id={button.id} className='container-button-chat' onClick={()=>{onChatClick(button.id, button.title);}}>
                    <div className="container-img"><img className="chat-img" src={button.avatar || defaultAvatar} alt="chat image"/></div>
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