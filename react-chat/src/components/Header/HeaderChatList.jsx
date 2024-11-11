import React from 'react';
import './HeaderChatList.scss';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import { logout } from '../../api/apiAuth'; 
import { useNavigate } from 'react-router-dom';
export const HeaderChatList = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
    logout();
    navigate('/auth'); 
    };
    return (
        <header className="header">
            <button className="icon-button" onClick={handleLogout} > <ExitToAppIcon sx={{ fontSize: 40 }} className='icon' /></button>
            <h1>Список чатов</h1>
            <button className="icon-button" > <SearchIcon sx={{ fontSize: 40 }} className='icon'/></button>            
        </header>
    );
}

// export default HeaderChatList;