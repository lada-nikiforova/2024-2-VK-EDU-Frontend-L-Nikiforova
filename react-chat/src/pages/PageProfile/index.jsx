import Footer from "../../components/Footer/Footer";
import {HeaderProfile} from "../../components/Header";
import './index.scss';
import {profile} from '../../constant';
import { useEffect, useState } from "react";
import InputProfile from "../../components/InputProfile/InputProfile";
import { getCurrentUser, updateUser } from "../../api/apiUser";
import defaultAvatar from "../../assets/avatar.png"


const PageProfile = () => {
    const [error, setError] = useState({username: false, first_name: false, last_name: false});
    const [serverError, setServerError] = useState('');
    const [data, setData] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value.trim();
        setError({ ...error, [name]: false});
        setData({ ...data, [name]: value });    
    }
    const userId = localStorage.getItem('userId');
    const getUser = async () => {
        const user = await getCurrentUser();
        if (user) {
            setData(user);
            localStorage.setItem(profile, JSON.stringify(user)); 
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    const saveDate = async (event) => {
        event.preventDefault(); 
        const newErrors = {
            first_name: !data.first_name.trim(), 
            last_name: !data.last_name.trim(),
            username: data.username.trim().length < 5,
        };
        console.log(error);
        setServerError('');
        setError(newErrors);
        if (!newErrors.first_name && !newErrors.last_name && !newErrors.username) { 
            try {
                const formData = new FormData();
                if (data.avatar.startsWith("data:image")) {
                    const file = await base64ToFile(data.avatar, 'avatar.png');
                    formData.append("avatar", file);
                }
                formData.append("first_name", data.first_name);
                formData.append("last_name", data.last_name);
                formData.append("username", data.username);
                formData.append("bio", data.bio || "");
                await updateUser(userId, formData);
                alert("Изменения сохранены и обновлены на сервере");
            } catch (error) {
                setServerError(error.message);
            }
        } 
        
    };
    const base64ToFile = async (base64, filename) => {
        const response = await fetch(base64);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    };
    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setData({ ...data, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div id="profile-page" > 
            <HeaderProfile title='Страница профиля' onRightIconClick={saveDate}/>
            <div className="main">
                <form className='container'>
                    <div className="container-image">
                        <label htmlFor="avatarInput">
                            <img
                                className="image"
                                src={data.avatar || defaultAvatar}
                                alt="user avatar"
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <input type="file" id="avatarInput" name="avatar" style={{display:'none'}} accept="image/*" onChange={handleAvatarChange}/>
                    </div>
                    <InputProfile name="first_name" placeholder="Введите ваше имя" value={data.first_name} onChange={handleChange} error={error.first_name} errorMessage="Введите ваше имя." textInput='Имя'/>
                    <InputProfile name="last_name" placeholder="Введите вашу фамилию" value={data.last_name} onChange={handleChange} error={error.last_name} errorMessage="Введите вашу фамилию." textInput='Фамилия'/>
                    <InputProfile name="username" placeholder="Введите имя пользователя"  value={data.username} onChange={handleChange} error={!!error.username || !!serverError} errorMessage={error.username ? "Введите как минимум 5 символов" : serverError} textInput='Имя пользователя'/>
                    <div className='container-input'>
                        <label for="bio">О себе</label>
                        <textarea className ='input-profile' maxLength={450} name="bio" placeholder="Напишите немного о себе" rows='5' type="text" value={data.bio} onChange={handleChange} />
                    </div> 
                </form>           
            </div>
            <Footer />
        </div>
    );
}
export default PageProfile;