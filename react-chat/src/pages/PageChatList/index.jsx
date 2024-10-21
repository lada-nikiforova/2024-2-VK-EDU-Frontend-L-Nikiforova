import React,  { useEffect, useState } from 'react';
import './index.scss';
import HeaderChatList from "../../components/HeaderChatList/HeaderChatList";
import ChatList from "../../components/ChatList/ChatList";
import Footer from "../../components/Footer/Footer";
import EditButton from '../../components/EditButton/EditButton';
import Modal from '../../components/Modal/Modal';

const PageChatList = ({onBack}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chat, setChat] = useState([]);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    useEffect(()=>{
        const loadChats = JSON.parse(localStorage.getItem('chats'))||[];
        console.log(loadChats);
        setChat(loadChats);
    }, []);
    const addChat = (newChat) => {
        const updatedChat = [...chat, newChat];
        console.log(updatedChat);
        setChat(updatedChat);
        localStorage.setItem('chats', JSON.stringify(updatedChat));
        closeModal();
    }
    const chatClick = (chatId, name) =>{
        console.log(chatId, name);
        localStorage.setItem('activeChatId', chatId);
        localStorage.setItem('activePerson', name);
        window.history.pushState({}, '', `?chat_id=${chatId}`);
        
    }
    return (
        <div id="chat-list" className="page-list"> 
            <HeaderChatList />
            <ChatList chat={chat} onChatClick={chatClick} onBack={onBack}/>
            <Footer />
            <EditButton onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} onAddChat={addChat}/>
        </div>
    );
}

export default PageChatList;
