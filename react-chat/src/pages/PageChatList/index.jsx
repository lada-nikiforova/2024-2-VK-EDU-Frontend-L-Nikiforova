import React,  { useEffect, useState } from 'react';
import './index.scss';
import ChatList from "../../components/ChatList/ChatList";
import Footer from "../../components/Footer/Footer";
import EditButton from '../../components/EditButton/EditButton';
import Modal from '../../components/Modal/Modal';
import { activeChatId, activePerson } from '../../constant';
import { HeaderChatList } from '../../components/Header';
import { getAllChats } from '../../api/apiChat';


const PageChatList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chat, setChat] = useState([]);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    useEffect(()=>{
        // const loadChats = JSON.parse(localStorage.getItem(chats))||[];
        // console.log(loadChats);
        getChats();
    }, []);
    const addChat = (newChat) => {
        const updatedChat = [...chat, newChat];
        console.log(updatedChat);
        setChat(updatedChat);
        // localStorage.setItem(chats, JSON.stringify(updatedChat));
        closeModal();
    }
    const chatClick = (chatId, name, userId) =>{
        console.log(chatId, name, userId);
        localStorage.setItem(activeChatId, chatId);
        localStorage.setItem(activePerson, name);
    }
    const getChats  = async () => {
        const loadChats = await getAllChats();
        setChat(loadChats);
    }

    return (
        <div id="chat-list" className="page-list"> 
            <HeaderChatList />
            <ChatList chat={chat} onChatClick={chatClick}/>
            <Footer />
            <EditButton onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} onAddChat={addChat}/>
        </div>
    );
}

export default PageChatList;
