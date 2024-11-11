import Footer from "../../components/Footer/Footer";
import {HeaderProfile} from "../../components/Header";
import './index.scss';
import {profile} from '../../constant';
import { useEffect, useState } from "react";
import InputProfile from "../../components/InputProfile/InputProfile";
import { getCurrentUser, updateUser } from "../../api/apiUser";

const PageProfile = () => {
    const [error, setError] = useState({firstName: false, lastName: false, userName: false});
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState(''); 
    const [bio, setBio] = useState(''); 
    const userId = localStorage.getItem('userId');
    const getUser = async () => {
        const user = await getCurrentUser();
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setUserName(user.username);
            setBio(user.bio);
            localStorage.setItem(profile, JSON.stringify(user)); 
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    const saveDate = async (event) => {
        event.preventDefault(); 
        const newErrors = {
            firstName: !firstName.trim(),
            lastName: !lastName.trim(),
            userName: userName.trim().length < 6,
        };
        console.log(newErrors);

        setError(newErrors);

        if (!newErrors.firstName && !newErrors.lastName && !newErrors.userName) {
            const newDate = {
                firstname: firstName.trim(),
                lastname: lastName.trim(),
                username: userName.trim(),
                bio: bio,
            };
            try {
                await updateUser(userId, newDate); 
                localStorage.setItem(profile, JSON.stringify(newDate));
                alert("Изменения сохранены и обновлены на сервере");
            } catch (error) {
                alert("Ошибка при сохранении данных на сервере");
            }
        } 
        
    };

    return (
        <div id="profile-page" > 
            <HeaderProfile title='Страница профиля' onRightIconClick={saveDate}/>
            <div className="main">
                <div className="container-image"><img className='image' src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
                <form className='container'>
                    <InputProfile name="first_name" placeholder="Введите ваше имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={error.firstName} errorMessage="Введите ваше имя." textInput='Имя'/>
                    <InputProfile name="last_name" placeholder="Введите вашу фамилию" value={lastName} onChange={(e) => setLastName(e.target.value)} error={error.lastName} errorMessage="Введите вашу фамилию." textInput='Фамилия'/>
                    <InputProfile name="username" placeholder="Введите имя пользователя"  value={userName} onChange={(e) => setUserName(e.target.value)} error={error.userName} errorMessage="Введите как минимум 5 символов" textInput='Имя пользователя'/>
                    <div className='container-input'>
                        <label for="bio">О себе</label>
                        <textarea className ='input-profile' maxLength={450} name="bio" placeholder="Напишите немного о себе" rows='5' type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div> 
                </form>           
            </div>
            <Footer />
        </div>
    );
}
export default PageProfile;