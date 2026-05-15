'use client';

import { loginWithPassword } from '@/api';
import { AUTH_PAGES } from '@/config';
import { LoginDto } from '@/dto';
import { LoginSchema } from '@/schemas';
import { User } from '@/types';
import AuthForm from '../AuthForm/AuthForm';
import BottomText from '../BottomText/BottomText';
import { LOGIN_FIELDS } from './loginFields';

const Login = () => {
	return (
		<AuthForm<LoginDto, User>
			fields={LOGIN_FIELDS}
			mutationFn={loginWithPassword}
			buttonLabel="Login"
			schema={LoginSchema}
			defaultValues={{ email: '', password: '' }}
			bottomText={
				<BottomText redirectText={'Register'} redirectUrl={AUTH_PAGES.REGISTER}>
					Don&apos;t have an account?
				</BottomText>
			}
		/>
	);
};

export default Login;
