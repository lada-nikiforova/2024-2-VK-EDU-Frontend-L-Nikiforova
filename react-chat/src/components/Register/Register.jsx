import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { register } from '../../api/apiAuth';
import '../Auth/Auth.scss';


const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [data, setData] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value.trim();
        setError({ ...error, [name]: null });
        setData({ ...data, [name]: value });    
    }
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(data);
            navigate('/auth');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data); 
            } else {
                alert('Ошибка регистрации');
            }
        }  
    };




    return (
        <div className="auth-container">
            <h1 className='title'>Регистрация</h1>
            <form id='signin' onSubmit={handleRegister}>
                <input type="text" placeholder='Имя пользователя' name='username' value={data.username} onChange={handleChange} required/>
                {error.username && <p className="error">{error.username}</p>}
                <input type="password" placeholder='Пароль' name='password' value={data.password} onChange={handleChange} required/>
                {error.password  && <p className="error">{error.password}</p>}              
                <input type="text" placeholder='Имя' name='first_name' value={data.first_name} onChange={handleChange} required/>
                <input type="text" placeholder='Фамилия' name='last_name' value={data.last_name} onChange={handleChange} required/>
                <input type="text" placeholder='О себе' name='bio' value={data.bio} onChange={handleChange} />
                <button type="submit">Зарегистрироваться</button>
                <p>Уже есть аккаунт. <Link to={"/auth"} >Войти</Link></p>
            </form>
        </div>
    );
};

export default Register;
