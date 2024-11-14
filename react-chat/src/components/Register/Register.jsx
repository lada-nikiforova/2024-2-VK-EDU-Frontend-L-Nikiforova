import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { register } from '../../api/apiAuth';
import '../Auth/Auth.scss';


const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [serverErrors, setServerErrors] = useState({});


    const handleUsername = (e) => {
        setUsername(e.target.value);
        if (e.target.value.trim()){
            setServerErrors('');
        }
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.trim()){
            setServerErrors('');
        }
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = {
            username, 
            password, 
            first_name, 
            last_name, 
            bio,
        };
        try {
            await register(userData);
            navigate('/auth');
        } catch (error) {
            if (error.response && error.response.data) {
                setServerErrors(error.response.data); 
            } else {
                alert('Ошибка регистрации');
            }
        }  
    };




    return (
        <div className="auth-container">
            <h1 className='title'>Регистрация</h1>
            <form id='signin' onSubmit={handleRegister}>
                <input type="text" placeholder='Имя пользователя' name='username' value={username} onChange={handleUsername} required/>
                {serverErrors.username && <p className="error">{serverErrors.username}</p>}
                <input type="password" placeholder='Пароль' name='password' value={password} onChange={handlePassword} required/>
                {serverErrors.password  && <p className="error">{serverErrors.password}</p>}              
                <input type="text" placeholder='Имя' name='first_name' value={first_name} onChange={(e) => setFirstName(e.target.value)} required/>
                <input type="text" placeholder='Фамилия' name='last_name' value={last_name} onChange={(e) => setLastName(e.target.value)} required/>
                <input type="text" placeholder='О себе' name='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                <button type="submit">Зарегистрироваться</button>
                <p>Уже есть аккаунт. <Link to={"/auth"} >Войти</Link></p>
            </form>
        </div>
    );
};

export default Register;
