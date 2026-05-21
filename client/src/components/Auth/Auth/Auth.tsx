'use client';

import { SectionHeader } from '@/components/UI';
import Login from '../Login/Login';
import QueryMessageHandler from '../QueryMessageHandler/QueryMessageHandler';
import Register from '../Register/Register';
import SocialAuth from '../SocialAuth/SocialAuth';
import styles from './Auth.module.scss';

interface AuthProps {
	isRegister?: boolean;
}

const Auth = ({ isRegister = false }: AuthProps) => {
	return (
		<div className={`container ${styles.auth}`}>
			<QueryMessageHandler />
			<SectionHeader title={isRegister ? 'Register' : 'Login'} />
			{isRegister ? <Register /> : <Login />}
			<SocialAuth />
		</div>
	);
};

export default Auth;
