'use client';

import Login from '../Login/Login';
import Register from '../Register/Register';
import SocialAuth from '../SocialAuth/SocialAuth';
import styles from './Auth.module.scss';

interface AuthProps {
	isRegister?: boolean;
}

const Auth = ({ isRegister = false }: AuthProps) => {
	return (
		<div className={`container ${styles['auth']}`}>
			<h1>{isRegister ? 'Register' : 'Login'}</h1>
			{isRegister ? <Register /> : <Login />}
			<SocialAuth />
		</div>
	);
};

export default Auth;
