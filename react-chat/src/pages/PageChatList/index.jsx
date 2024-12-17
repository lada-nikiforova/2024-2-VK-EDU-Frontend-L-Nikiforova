import React,  { useEffect, useState } from 'react';
import './index.scss';
import ChatList from "../../components/ChatList/ChatList";
import Footer from "../../components/Footer/Footer";
import EditButton from '../../components/EditButton/EditButton';
import Modal from '../../components/Modal/Modal';
import { activeChatId, activePerson } from '../../constant';
import { HeaderChatList } from '../../components/Header';
import { getAllChats } from '../../api/apiChat';
import { useDispatch, useSelector } from 'react-redux';
import { getChats, setChat } from '../../store/slices/chatSlice';
import Loader from '../../components/Loader/Loader';
import { getUsers } from '../../api/apiUser';


const PageChatList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [chats, setChats] = useState([]);
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chat.chats);
    const loading = useSelector((state) => state.chat.loading);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    useEffect(()=>{
        dispatch(getChats());
    }, []);
    const addChat = (newChat) => {
        const updatedChat = [...chats, newChat];
        console.log(updatedChat);
        dispatch(setChat(updatedChat));
        dispatch(getChats());
        // localStorage.setItem(chats, JSON.stringify(updatedChat));
        closeModal();
    }
    const chatClick = (chatId, name, userId) =>{
        console.log(chatId, name, userId);
        localStorage.setItem(activeChatId, chatId);
        localStorage.setItem(activePerson, name);
    }

    if (loading) {
        return <Loader/>; 
    }

    return (
        <div id="chat-list" className="page-list"> 
            <HeaderChatList />
            <ChatList chat={chats} onChatClick={chatClick}/>
            <Footer />
            <EditButton onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} onAddChat={addChat} />
        </div>
    );
}

export default PageChatList;
