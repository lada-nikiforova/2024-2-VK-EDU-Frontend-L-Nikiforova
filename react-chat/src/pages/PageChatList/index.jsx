import React,  { useEffect, useState } from 'react';
import './index.scss';
import ChatList from "../../components/ChatList/ChatList";
import Footer from "../../components/Footer/Footer";
import EditButton from '../../components/EditButton/EditButton';
import Modal from '../../components/Modal/Modal';
import { activeChatId} from '../../constant';
import { HeaderChatList } from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getChats, setChat } from '../../store/slices/chatSlice';
import Loader from '../../components/Loader/Loader';

const PageChatList = ({onLogout}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    }

    if (loading) {
        return <Loader/>; 
    }

    return (
        <div id="chat-list" className="page-list"> 
            <HeaderChatList onLogout={onLogout}/>
            <ChatList chat={chats} onChatClick={chatClick}/>
            <Footer />
            <EditButton onClick={openModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal} onAddChat={addChat} />
        </div>
    );
}

export default PageChatList;
