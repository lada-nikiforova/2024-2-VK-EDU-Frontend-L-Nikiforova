import React from 'react';
import './Footer.scss';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="sidebar">  
            <button className="icon-button"><GroupIcon sx={{ fontSize: 40 }} className='icon'/></button>
            <Link to={"/"}>
                <button className="icon-button" ><ChatBubbleIcon sx={{ fontSize: 40 }} className='icon'/></button>
            </Link>
            <Link to={"/profile"}>
                <button className="icon-button"><SettingsIcon sx={{ fontSize: 40 }} className='icon'/></button>
            </Link>
        </footer>
    );
}

export default Footer;