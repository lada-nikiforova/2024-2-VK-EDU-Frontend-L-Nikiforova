import Footer from "../../components/Footer/Footer";
import {HeaderProfile} from "../../components/Header";
import './index.scss';
import {profile} from '../../constant';
import { useEffect, useState } from "react";
import InputProfile from "../../components/InputProfile/InputProfile";
import { getCurrentUser, updateUser } from "../../api/apiUser";

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
            username: data.username.trim().length < 6,
        };
        console.log(error);
        setServerError('');
        setError(newErrors);
        if (!newErrors.first_name && !newErrors.last_name && !newErrors.username) { 
            try {
                await updateUser(userId, data);
                localStorage.setItem(profile, JSON.stringify(data));
                alert("Изменения сохранены и обновлены на сервере");
            } catch (error) {
                setServerError(error.message);
            }
        } 
        
    };

    return (
        <div id="profile-page" > 
            <HeaderProfile title='Страница профиля' onRightIconClick={saveDate}/>
            <div className="main">
                <div className="container-image"><img className='image' src="https://img.freepik.com/premium-vector/user-profile-vector-illustration_1237743-44335.jpg?" alt="chat image"/></div>
                <form className='container'>
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