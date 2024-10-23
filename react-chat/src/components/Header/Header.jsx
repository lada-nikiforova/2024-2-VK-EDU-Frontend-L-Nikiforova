import { useEffect, useState} from 'react';
import './Header.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {activePerson } from '../../constant';
const Header = ({ onBack }) => {
    // const chatData = localStorage.getItem('activePerson')
    const [chat, setChat] = useState('');
    useEffect(()=>{
        const chatData = localStorage.getItem(activePerson);
        setChat(chatData);
    }, []);
    const onClickChatList = () =>{
        const url = new URL(window.location);
        url.searchParams.delete('chat_id');
        window.history.replaceState(null, '', url.toString());
        onBack();

    }

    return (
        <div className="main_header">
            <button className="icon-button list-button" onClick={onClickChatList}><ArrowBackIcon sx={{ fontSize: 40 }} className='icon'/></button>
            <div className="img-container"><img src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
            <div className = "text-header"> <p className="person-name">{chat}</p>
            <p className = "status">Онлайн</p> </div>
        </div>
    );
}

export default Header;