import Footer from "../../components/Footer/Footer";
import HeaderChatList from "../../components/HeaderChatList/HeaderChatList";
import CheckIcon from '@mui/icons-material/Check';
import './index.scss';
import {profile} from '../../constant';
import { useEffect, useState } from "react";
import InputProfile from "../../components/InputProfile/InputProfile";

const PageProfile = () => {
    const [fullName, setFullName] = useState(''); 
    const [userName, setUserName] = useState('@'); 
    const [bio, setBio] = useState(''); 
    const saveDate = (event) => {
        event.preventDefault(); 
        const newDate = {
            fullname: fullName.trim(),
            username: userName.trim(),
            bio: bio,
        };
        localStorage.setItem(profile, JSON.stringify(newDate));  
    };
    useEffect(()=>{
        const loadProfile = JSON.parse(localStorage.getItem(profile))||[];
        setFullName(loadProfile.fullname);
        setUserName(loadProfile.username);
        setBio(loadProfile.bio);
    }, []);
    
    return (
        <div id="profile-page" > 
            <HeaderChatList title='Страница профиля' rightIcon={CheckIcon} onRightIconClick={saveDate}/>
            <div className="main">
                <div className="container-image"><img className='image' src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
                <form className='contaner'>
                    <InputProfile name="fullname" rows='1' placeholder="Введите ваше имя" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                    <InputProfile name="username" rows='1' placeholder="Введите имя пользователя"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <InputProfile name="bio" rows='5' placeholder="О себе" type="text" value={bio} onChange={(e) => setBio(e.target.value)}/>
                </form>           
            </div>
            <Footer />
        </div>
    );
}
export default PageProfile;