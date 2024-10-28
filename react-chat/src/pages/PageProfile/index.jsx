import Footer from "../../components/Footer/Footer";
import {HeaderProfile} from "../../components/Header";
import './index.scss';
import {profile} from '../../constant';
import { useEffect, useState } from "react";
import InputProfile from "../../components/InputProfile/InputProfile";

const PageProfile = () => {
    const [error, setError] = useState({fullName: false, surname: false, userName: false});
    const [fullName, setFullName] = useState(''); 
    const [surname, setSurname] = useState('');
    const [userName, setUserName] = useState('@'); 
    const [bio, setBio] = useState(''); 
    
    const saveDate = (event) => {
        event.preventDefault(); 
        const newErrors = {
            fullName: !fullName.trim(),
            surname: !surname.trim(),
            userName: userName.trim().length < 6,
        };
        console.log(newErrors);

        setError(newErrors);

        if (!newErrors.fullName && !newErrors.surname && !newErrors.userName) {
            const newDate = {
                fullname: fullName.trim(),
                surname: surname.trim(),
                username: userName.trim(),
                bio: bio,
            };
            localStorage.setItem(profile, JSON.stringify(newDate)); 
            alert('Изменения сохранены');
        } 
        
    };
    useEffect(()=>{
        const loadProfile = JSON.parse(localStorage.getItem(profile))||[];
        setFullName(loadProfile.fullname || '');
        setSurname(loadProfile.surname ||'');
        setUserName(loadProfile.username || '@');
        setBio(loadProfile.bio || '');
    }, []);
    
    return (
        <div id="profile-page" > 
            <HeaderProfile title='Страница профиля' onRightIconClick={saveDate}/>
            <div className="main">
                <div className="container-image"><img className='image' src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
                <form className='contaner'>
                    <InputProfile name="fullname" placeholder="Введите ваше имя" value={fullName} onChange={(e) => setFullName(e.target.value)} error={error.fullName} errorMessage="Введите ваше имя."/>
                    <InputProfile name="surname" placeholder="Введите вашу фамилию" value={surname} onChange={(e) => setSurname(e.target.value)} error={error.surname} errorMessage="Введите вашу фамилию."/>
                    <InputProfile name="username" placeholder="Введите имя пользователя"  value={userName} onChange={(e) => setUserName(e.target.value)} error={error.userName} errorMessage="Введите как минимум 5 символов"/>
                    <div className='container-input'>
                        <label for="bio">bio</label>
                        <textarea className ='input-profile' maxLength={450} name="bio" placeholder="О себе" rows='5' type="text" value={bio} onChange={(e) => setBio(e.target.value)}/>
                    </div> 
                </form>           
            </div>
            <Footer />
        </div>
    );
}
export default PageProfile;