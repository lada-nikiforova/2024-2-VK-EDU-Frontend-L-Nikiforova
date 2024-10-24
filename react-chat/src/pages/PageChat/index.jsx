import React, {useState, useEffect, useRef} from 'react';
import './index.scss';
import Header from '../../components/Header/Header.jsx';
import ContainerChat from '../../components/Chat/ContainerChat.jsx';
import InputForm from '../../components/InputForm/InputForm.jsx';
import { activeChatId } from '../../constant';


const PageChat = ({ onBack }) => {
    
    const [message, setMessage] = useState([]);
    
    const activeChat = localStorage.getItem(activeChatId);
    
    useEffect(()=>{
        const loadMessages = JSON.parse(localStorage.getItem(activeChat))||[];
        setMessage(loadMessages);
    }, []);
    
    
    const addMessage = (newMessage) => {
        const updatedMessage = [...message, newMessage];
        console.log(updatedMessage);
        setMessage(updatedMessage);
        localStorage.setItem(activeChat, JSON.stringify(updatedMessage));
    }

    return (
        <div id="chat-page" className="chat">
            <Header onBack={onBack} />
            <ContainerChat message={message}/>
            <InputForm onAddMessage={addMessage}/>
        </div>
    );
}

export default PageChat;