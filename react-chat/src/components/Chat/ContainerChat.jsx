import React, {useEffect, useRef} from 'react';
import './ContainerChat.scss';
import { profile } from '../../constant';

const ContainerChat = ({message}) => {
    const bottomRef = useRef();
    const userId = localStorage.getItem('userId');
    const myUsername = JSON.parse(localStorage.getItem(profile)).username;
    useEffect(() => {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;   
      }, []);
    const isUrl = (text) => {
        const urlPattern = /https?:\/\/[^\s]+/g;
        return urlPattern.test(text);
    };
    return (
        <div ref={bottomRef} className="container-chat">          
                {message.map((mes) => (    
                    <div key={mes.id} className={`container-message ${mes.sender.id === userId ? 'my-message' : 'other-message'}`}>
                        {mes.sender.id !== userId && (
                            <div className="img-container"><img className="img-icon" src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?"/></div>
                        )}
                        <div className= {`message-content`}>
                            <div className={`name ${mes.sender.id === userId ? '' : 'name__person'}`}>
                                {mes.sender.id === userId ? myUsername : mes.sender.username}
                            </div>
                            <div className={`message ${mes.sender.id === userId ? '' : 'person'}`}>
                                {isUrl(mes.text) ? (
                                    <a href={mes.text} target="_blank" rel="noopener noreferrer">
                                        {mes.text}
                                    </a>
                                ) : (
                                    mes.text
                                )}</div>
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