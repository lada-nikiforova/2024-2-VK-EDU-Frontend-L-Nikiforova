import React from 'react';
import './HeaderChatList.scss';


const HeaderChatList = ({title, leftIcon: LeftIcon, rightIcon: RightIcon, onRightIconClick}) => {
    return (
        <header className="header">
            <button className="icon-button" >{LeftIcon && <LeftIcon sx={{ fontSize: 40 }} className='icon' />}</button>
            <h1>{title}</h1>
            <button className="icon-button" >{RightIcon && <RightIcon sx={{ fontSize: 40 }} className='icon' onClick={onRightIconClick} />}</button>            
        </header>
    );
}

export default HeaderChatList;