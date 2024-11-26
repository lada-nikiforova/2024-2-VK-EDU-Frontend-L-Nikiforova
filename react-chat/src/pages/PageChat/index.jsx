import React, {useState, useEffect, useRef} from 'react';
import './index.scss';
import {HeaderChat} from '../../components/Header';
import ContainerChat from '../../components/Chat/ContainerChat.jsx';
import InputForm from '../../components/InputForm/InputForm.jsx';
import { activeChatId, profile } from '../../constant';
import { getAllMessages, saveMessage } from '../../api/apiMessage';
import { getAllChats, getChat } from '../../api/apiChat';
import { showNotification } from '../../notification';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages, setMessages } from '../../store/slices/messagesSlice';
import { setChat } from '../../store/slices/chatSlice';

const PageChat = () => {
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState(null);
    // const [chat, setChat] = useState([]);
    const activeChat = localStorage.getItem(activeChatId);
    const [isNewMessage, setIsNewMessage] = useState(false);
    const lastMessage = useRef({});
    const messages = useSelector((state) => state.messages.messages);
    const dispatch = useDispatch();
    const chat = useSelector((state) => state.chat.chat);
    const getMessages  = async () => {
        const loadMessages = await getAllMessages(activeChat);
        const sortedMessages = loadMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        dispatch(setMessages(sortedMessages));
        setIsNewMessage(false);
        if (newMessage !== null){
            setIsNewMessage(true);
            // console.log('da');
        }
        else{
            setIsNewMessage(false);
            // console.log('net');
        }        
    }
    const getCurrentChat = async ()=>{
        const loadChat = await getChat(activeChat);
        dispatch(setChat(loadChat));
        setIsNewMessage(true);
    }
    const initializeLastMessage = async () => {
        const allChats = await getAllChats();
        const initialLastMessages = {};
        allChats.forEach((chat) => {
            if (chat.last_message) {
                initialLastMessages[chat.id] = chat.last_message.id;
            }
        });
        lastMessage.current = initialLastMessages;
    };
    const addNotification = async () => {
        const chats = await getAllChats(); 
        for (const chat of chats) {
            if (chat.id !== activeChat) {
                if (lastMessage.current[chat.id] !== chat.last_message.id) {
                    console.log("DA");
                    lastMessage.current[chat.id] = chat.last_message.id; 
                    showNotification(chat, chat.avatar); 
                }
            }
        }
    };
    useEffect(() => {
        initializeLastMessage();
        getMessages();
        getCurrentChat();
        const intervalId = setInterval(getMessages, 1500);
        return () => clearInterval(intervalId);
    }, [activeChat]);
    useEffect(() => {
        const intervalId = setInterval(addNotification, 1500);
        return () => clearInterval(intervalId);
    }, [activeChat]);
    

    const addMessage = async (newMess) => {
        const data = await saveMessage(newMess);
        dispatch(addMessages(data));
        setNewMessage(data);
        console.log(newMess);
        getMessages();
    }

    return (
        <div id="chat-page" className="chat">
            <HeaderChat chat={chat} />
            <ContainerChat message={messages} isNewMessage={isNewMessage}/>
            <InputForm onAddMessage={addMessage}/>
        </div>
    );
}

export default PageChat;
