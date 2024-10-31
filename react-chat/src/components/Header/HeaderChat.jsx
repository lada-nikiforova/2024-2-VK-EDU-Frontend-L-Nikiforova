import { useEffect, useState} from 'react';
import './HeaderChat.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {activePerson } from '../../constant';
import { Link } from 'react-router-dom';

export const HeaderChat = () => {
    const [chat, setChat] = useState('');
    useEffect(()=>{
        const chatData = localStorage.getItem(activePerson);
        setChat(chatData);
    }, []);

    return (
        <div className="main_header">
            <Link to={"/"}>
                <ArrowBackIcon sx={{ fontSize: 40 }} className='icon'/>
            </Link>   
            <div className="img-container"><img src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
            <div className = "text-header"> <p className="person-name">{chat}</p>
            <p className = "status">Онлайн</p> </div>
        </div>
    );
}

// export default HeaderChat;