import { useEffect, useState} from 'react';
import './HeaderChat.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {activePerson } from '../../constant';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/avatar.png'

export const HeaderChat = ({chat}) => {
    return (
        <div className="main_header">
            <Link to={"/"}>
                <ArrowBackIcon sx={{ fontSize: 40 }} className='icon'/>
            </Link>   
            <div className="img-container"><img className='img-header' src={chat.avatar || defaultAvatar} alt="chat image"/></div>
            <div className = "text-header"> <p className="person-name">{chat.title}</p>
            <p className = "status">Онлайн</p> </div>
        </div>
    );
}

// export default HeaderChat;