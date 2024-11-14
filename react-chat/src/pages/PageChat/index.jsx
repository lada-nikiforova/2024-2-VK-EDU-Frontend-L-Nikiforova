import React, {useState, useEffect, useRef} from 'react';
import './index.scss';
import {HeaderChat} from '../../components/Header';
import ContainerChat from '../../components/Chat/ContainerChat.jsx';
import InputForm from '../../components/InputForm/InputForm.jsx';
import { activeChatId, profile } from '../../constant';
import { getAllMessages, saveMessage } from '../../api/apiMessage';

const PageChat = () => {
    const [message, setMessage] = useState([]);
    const activeChat = localStorage.getItem(activeChatId);
    const getMessages  = async () => {
        const loadMessages = await getAllMessages(activeChat);
        const sortedMessages = loadMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setMessage(sortedMessages);
    }
    

    useEffect(() => {
        getMessages();
        const intervalId = setInterval(getMessages, 1500);
        return () => clearInterval(intervalId);
    }, [activeChat]);
    
    
    const addMessage = async (newMessage) => {
        console.log(newMessage);
        await saveMessage(newMessage);
        getMessages();
    }

    return (
        <div id="chat-page" className="chat">
            <HeaderChat/>
            <ContainerChat message={message}/>
            <InputForm onAddMessage={addMessage}/>
        </div>
    );
}

export default PageChat;