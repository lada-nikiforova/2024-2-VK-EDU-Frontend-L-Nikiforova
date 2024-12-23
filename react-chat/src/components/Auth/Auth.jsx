import { useState } from 'react';
import { login } from '../../api/apiAuth';
import './Auth.scss';
import { Link } from 'react-router-dom';

const Auth = ({onAuthSuccess}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    try {
      await login(credentials);
      onAuthSuccess();
      
    } catch {
      alert('Ошибка входа');
    }
  };

  return (
    <div className="auth-container">
      <h1 className='title'>Вход</h1>
      <form id='signin' onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Имя пользователя'
            required
          /> 
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Пароль'
            required
          />
        <button onClick={handleLogin} type="submit">Войти</button>
        <p>Нет аккаунта? <Link to={"/register"}>Зарегистрируйтесь.</Link></p>
      </form>
      
    </div>
  );
};

export default Auth;
