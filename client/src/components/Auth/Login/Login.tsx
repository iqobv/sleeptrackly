'use client';

import { loginWithPassword } from '@/api/auth/auth.api';
import { AUTH_PAGES } from '@/config/authPages.config';
import { LoginDto } from '@/dto/auth/auth.dto';
import { LoginSchema } from '@/schemas/auth/login.schema';
import { AuthForm } from '../AuthForm/AuthForm';
import { BottomText } from '../BottomText/BottomText';
import { LOGIN_FIELDS } from './loginFields';

type LoginResponse = Awaited<ReturnType<typeof loginWithPassword>>;

export const Login = () => {
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
