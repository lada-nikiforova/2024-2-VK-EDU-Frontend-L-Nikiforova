import React from 'react';
import './ChatList.scss';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';


const ChatList = ({chat, onChatClick}) => {
    const renderAvatar = (chat) => {
        const iconLetters = chat.title.charAt(0).toUpperCase();
        const avatarStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            fontSize: "40px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "rgb(61, 103, 202)",
          };

        return (
            <div style={avatarStyle} className='render-avatar'>
                {iconLetters}
            </div>
        );
    }
    return (
        <div className="list">
            {chat.map((button)=>(
                <Link to= {`/chat/${button.id}`} key={button.id} id={button.id} className='container-button-chat' onClick={()=>{onChatClick(button.id, button.title);}}>
                    <div className="container-img">
                        {button.avatar === null ? renderAvatar(button) : <LazyImage className="chat-img" alt="Avatar user" src={button.avatar} containerSelector=".list"/>}
                    </div>
                    <div className="chat-info">
                        <div className="chat-name">{button.title}</div>
                        <div className="chat-message">{button.last_message === null ? (<p>Нет сообщений</p>) : 
                            button.last_message.text ? (<p>{button.last_message.text}</p>) : 
                            button.last_message.voice ? (<p>Голосовое сообщение</p>) : 
                            button.last_message.files.length > 0 ? (<p>Фото</p>) : (<p>Нет сообщений</p>) }
                        </div>
                    </div>
                    <div className="chat-time">{new Date(button.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </Link>   
            ))}
        </div>
    );
}

export default ChatList;