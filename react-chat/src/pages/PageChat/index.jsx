import React, { useEffect, useRef } from 'react';
import './index.scss';
import {HeaderChat} from '../../components/Header';
import ContainerChat from '../../components/Chat/ContainerChat.jsx';
import InputForm from '../../components/InputForm/InputForm.jsx';
import { activeChatId, profile } from '../../constant';
import { saveMessage } from '../../api/apiMessage';
import { showNotification } from '../../notification';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages, fetchMessages, setMessages } from '../../store/slices/messagesSlice';
import { getCurrentChat, setChat } from '../../store/slices/chatSlice';
import { connectToCentrifugo, disconnectFromCentrifugo } from '../../store/action';
import Loader from '../../components/Loader/Loader';


const PageChat = () => {
    const activeChat = localStorage.getItem(activeChatId);
    const lastMessage = useRef({});
    const messagesRef = useRef(null);
    const messages = useSelector((state) => state.messages.messages);
    const loading = useSelector((state) => state.messages.loading);
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const chat = useSelector((state) => state.chat.chat);
    const loadingChat = useSelector((state) => state.chat.loading);
    
    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const centrifugoChat = (activeChat) => {
        connectToCentrifugo(activeChat, (event, message) => {
          if (event === 'create') {
            console.log('новое сообщение:', message);
            if (message.sender.id === userId) {
                console.log('Сообщение отправлено мной');
                
                return;
            }
            if (message.chat !== activeChat){
                showNotification(message);
                return;
            }
            dispatch(addMessages(message));
            
          }
        });
    };
    useEffect(() => {
        centrifugoChat(userId);
        // console.log(chat);
        dispatch(fetchMessages(activeChat));
        dispatch(getCurrentChat(activeChat));
        return () => {
            disconnectFromCentrifugo();
        };
    }, [activeChat]);
    // useEffect(()=>{
        
    //     console.log(chat);
    // }, []);
    
    const addMessage = async (newMess) => {
        const data = await saveMessage(newMess);
        dispatch(addMessages(data));
        console.log(newMess);
    }

    if (loading) {
        return <Loader/>; 
    }
    if (loadingChat) {
        return <Loader/>; 
    }
    
    return (
        <div id="chat-page" className="chat">
            <HeaderChat chat={chat} />
            <div className="container-chat" ref={messagesRef}>
                <ContainerChat message={messages} />
            </div>
            <InputForm onAddMessage={addMessage}/>
        </div>
    );
}

export default PageChat;
