'use client';

import { registerWithPassword } from '@/api';
import { PAGES } from '@/config';
import { RegisterDto } from '@/dto';
import { RegisterSchema } from '@/schemas';
import { IRegisterResult } from '@/types';
import AuthForm from '../AuthForm/AuthForm';
import BottomText from '../BottomText/BottomText';
import { REGISTER_FIELDS } from './registerFields';

const Register = () => {
	return (
		<AuthForm<RegisterDto, IRegisterResult>
			buttonLabel="Register"
			mutationFn={registerWithPassword}
			fields={REGISTER_FIELDS}
			schema={RegisterSchema}
			isRegister
			defaultValues={{ email: '', password: '', username: '' }}
			bottomText={
				<BottomText redirectText={'Login'} redirectUrl={PAGES.LOGIN}>
					Already have an account?
				</BottomText>
			}
		/>
	);
};

export default Register;
