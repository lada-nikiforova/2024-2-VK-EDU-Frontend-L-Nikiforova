import './Footer.scss';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    return (
        <footer className="sidebar">  
            <button className="icon-button"><GroupIcon sx={{ fontSize: 40 }} className='icon'/></button>
            <Link to={"/"} className={`icon-button ${location.pathname === "/" ? 'active-btn' : ''}`}>
                <ChatBubbleIcon sx={{ fontSize: 40 }} className={`icon ${location.pathname === "/" ? 'active' : ''}`}/>
            </Link>
            <Link to={"/profile"} className={`icon-button ${location.pathname === "/profile" ? 'active-btn' : ''}`}>
                <SettingsIcon sx={{ fontSize: 40 }} className={`icon ${location.pathname === "/profile" ? 'active' : ''}`}/>
            </Link>
        </footer>
    );
}

export default Footer;