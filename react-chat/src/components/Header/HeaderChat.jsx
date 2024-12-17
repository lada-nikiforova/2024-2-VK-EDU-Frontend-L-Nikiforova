import { useEffect, useState} from 'react';
import './HeaderChat.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {activePerson } from '../../constant';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/avatar.png'

export const HeaderChat = ({chat}) => {
    const renderAvatar = (chat) => {
        const iconLetters = chat.title.charAt(0).toUpperCase();
        const avatarStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            fontSize: "30px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "rgb(61, 103, 202)",
          };

        return (
            <div style={avatarStyle} className='render-avatar'>
                {iconLetters}
            </div>
        );
    }
    console.log(chat);
    return (
        <div className="main_header">
            <Link to={"/"}>
                <ArrowBackIcon sx={{ fontSize: 40 }} className='icon'/>
            </Link>   
            <div className="img-container">
                {chat.avatar === null ? renderAvatar(chat) : <img className="img-header" src={chat.avatar}/>}
            </div>
            <div className = "text-header"> <p className="person-name">{chat.title}</p>
            <p className = "status"> {chat?.members?.length > 2 ? `${chat?.members?.length} участников` : 'Онлайн'}</p>
            </div> 
        </div>
    );
}

// export default HeaderChat;