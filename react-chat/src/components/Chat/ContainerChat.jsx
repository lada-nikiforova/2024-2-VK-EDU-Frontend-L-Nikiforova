import React, {useEffect, useRef} from 'react';
import './ContainerChat.scss';
import { profile } from '../../constant';
import defaultAvatar from '../../assets/avatar.png'

const ContainerChat = ({message, isNewMessage}) => {
    const bottomRef = useRef();
    const userId = localStorage.getItem('userId');
    const myUsername = JSON.parse(localStorage.getItem(profile)).username;
    useEffect(() => {
        if (isNewMessage){
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        }
        // console.log(isNewMessage);   
    }, [message, isNewMessage]);
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
        <div ref={bottomRef} className="container-chat">          
                {message.map((mes) => (    
                    <div key={mes.id} className={`container-message ${mes.sender.id === userId ? 'my-message' : 'other-message'}`}>
                        {mes.sender.id !== userId && (
                            <div className="img-container"><img className="img-icon" src={mes.sender.avatar||defaultAvatar}/></div>
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
                
            
        </div>
    );
}

export default ContainerChat;