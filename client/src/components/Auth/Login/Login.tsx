'use client';

import { loginWithPassword } from '@/api';
import { AUTH_PAGES } from '@/config';
import { LoginDto } from '@/dto';
import { LoginSchema } from '@/schemas';
import AuthForm from '../AuthForm/AuthForm';
import BottomText from '../BottomText/BottomText';
import { LOGIN_FIELDS } from './loginFields';

type LoginResponse = Awaited<ReturnType<typeof loginWithPassword>>;

const Login = () => {
	return (
		<AuthForm<LoginDto, LoginResponse>
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
