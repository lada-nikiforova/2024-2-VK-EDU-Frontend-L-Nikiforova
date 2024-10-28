import React from 'react';
import './HeaderChatList.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export const HeaderChatList = () => {
    return (
        <header className="header">
            <button className="icon-button" > <MenuIcon sx={{ fontSize: 40 }} className='icon' /></button>
            <h1>Список чатов</h1>
            <button className="icon-button" > <SearchIcon sx={{ fontSize: 40 }} className='icon'/></button>            
        </header>
    );
}

// export default HeaderChatList;