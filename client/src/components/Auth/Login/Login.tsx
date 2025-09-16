'use client';

import { loginWithPassword } from '@/api';
import { PAGES } from '@/config';
import { LoginDto } from '@/dto';
import { LoginSchema } from '@/schemas';
import { IUser } from '@/types';
import AuthForm from '../AuthForm/AuthForm';
import BottomText from '../BottomText/BottomText';
import { LOGIN_FIELDS } from './loginFields';

const Login = () => {
	return (
		<AuthForm<LoginDto, IUser>
			fields={LOGIN_FIELDS}
			mutationFn={loginWithPassword}
			buttonLabel="Login"
			schema={LoginSchema}
			bottomText={
				<BottomText redirectText={'Register'} redirectUrl={PAGES.REGISTER}>
					Don&apos;t have an account?
				</BottomText>
			}
		/>
	);
};

export default Login;
