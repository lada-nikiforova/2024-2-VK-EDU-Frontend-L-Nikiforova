import React from 'react';
import './HeaderChatList.scss';
import CheckIcon from '@mui/icons-material/Check';

export const HeaderProfile = ({onRightIconClick}) => {
    return (
        <header className="header">
            <div></div>
            <h1 className='title'>Cтраница профиля</h1>
            <button onClick={onRightIconClick} className="icon-button profile"><CheckIcon sx={{ fontSize: 40 }} className='icon'/></button>            
        </header>
    );
}

// export default HeaderProfile;