import React, {useEffect, useRef} from 'react';
import './ContainerChat.scss';
import { profile } from '../../constant';
import defaultAvatar from '../../assets/avatar.png'

const ContainerChat = ({message}) => {
    const userId = localStorage.getItem('userId');
    const myUsername = JSON.parse(localStorage.getItem(profile)).username;

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const renderAvatar = (message) => {
            console.log(message);
            const iconLetters = message.sender.first_name.charAt(0).toUpperCase() + message.sender.last_name.charAt(0).toUpperCase();
            const avatarStyle = {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                fontSize: "30px",
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
    
    // const firstLetter = message.first_name.charAt(0).toUpperCase();
    // const secondLetter = message.last_name.charAt(0).toUpperCase();
    // const iconLetters = message.sender.first_name.charAt(0).toUpperCase() + message.sender.last_name.charAt(0).toUpperCase();
    // console.log(iconLetters);

    const bgColor = getRandomColor(); 
    const renderMessageContent = (message) => {
        const isUrl = (text) => /https?:\/\/[^\s]+/g.test(text); 
        if (message.files && message.files.length > 0) {
            return (
                <div className="message-files">
                    {message.files.map((file, index) =>
                        <img key={index} src={file.item} alt={`attachment-${index}`} className="message-image"/>
                    )}
                </div>
            );
        } else if (isUrl(message.text)) 
        { return(
                <a href={message.text} target="_blank" rel="noopener noreferrer">
                    {message.text}
                </a>)
                
        } else if (message.voice){
            const audioURL = message.voice instanceof Blob ? URL.createObjectURL(message.voice) : message.voice;
            return (
                <audio controls src={audioURL} style={{ display: "block", marginTop: "10px" }} />
            );
        }
        else {
            return message.text;
        }
    };
    return (
        <>          
                {message.map((mes) => (    
                    <div key={mes.id} className={`container-message ${mes.sender.id === userId ? 'my-message' : 'other-message'}`}>
                        {mes.sender.id !== userId && (
                            <div className="img-container">
                                {mes.sender.avatar === null ? renderAvatar(mes) : <img className="img-icon" src={mes.sender.avatar}/>}
                               </div>
                        )}
                        <div className= {`message-content`}>
                            <div className={`name ${mes.sender.id === userId ? '' : 'name__person'}`}>
                                {mes.sender.id === userId ? myUsername : mes.sender.username}
                            </div>
                            <div className={`message ${mes.sender.id === userId ? '' : 'person'}`}>
                                {renderMessageContent(mes)}
                            </div>
                            <div className="time">
                                {new Date(mes.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                
            
        </>
    );
}

export default ContainerChat;