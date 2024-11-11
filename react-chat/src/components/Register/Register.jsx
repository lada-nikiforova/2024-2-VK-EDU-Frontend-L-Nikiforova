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
            alert('Ошибка регистрации');
        }  
    };




    return (
        <div className="auth-container">
            <h1 className='title'>Регистрация</h1>
            <form id='signin' onSubmit={handleRegister}>
                <input type="text" placeholder='Имя пользователя' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" placeholder='Пароль' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
// {error && <p className="error">{error}</p>}