
import React, { useState } from 'react';
import cl from './Login.module.css';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
	const { onLogin } = useAuth();
	const [login, setlogin] = useState('');
	const [password, setpassword] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin({ login: login, password: password })
	}

	return (
		<div className={cl.login} >
			<div className={cl.loginHeader}> Авторизация </div>

			<input 
			className={cl.text_input} 
			type='text' 
			value={login} 
			onChange={e => setlogin(e.target.value)} 
			placeholder='Имя' 
			autoFocus 
			/>

			<input 
			className={cl.text_input} 
			type='password' 
			value={password} 
			onChange={e => setpassword(e.target.value)} 
			placeholder='Пароль' />

			<button type="button" className='button-modal'
				disabled={!(login || password)}
				onClick={handleSubmit}>
				все так
			</button>
		</div>
	)
}

export default Login;
