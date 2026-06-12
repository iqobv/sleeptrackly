import { PAGES } from '@/config/pages.config';
import { RegisterDto } from '@/dto/auth/auth.dto';
import { AuthField } from '@/types/auth/authField.types';
import Link from 'next/link';
import { ComponentProps } from 'react';
import {
	MdOutlineEmail,
	MdOutlineVpnKey,
	MdPersonOutline,
} from 'react-icons/md';

const props: ComponentProps<'a'> = {
	style: {
		color: 'var(--link-color)',
		textDecoration: 'underline',
	},
	target: '_blank',
	rel: 'noopener noreferrer',
};

export const REGISTER_FIELDS: AuthField<RegisterDto>[] = [
	{
		name: 'email',
		label: 'Enter your email',
		type: 'email',
		placeholder: 'email@example.com',
		autoComplete: 'username',
		icon: <MdOutlineEmail />,
	},
	{
		name: 'password',
		label: 'Create a password',
		type: 'password',
		placeholder: 'Password',
		autoComplete: 'new-password',
		icon: <MdOutlineVpnKey />,
	},
	{
		name: 'username',
		label: 'Create a username',
		type: 'text',
		placeholder: 'Username',
		autoComplete: 'on',
		icon: <MdPersonOutline />,
	},
	{
		name: 'acceptTerms',
		label: (
			<div>
				I agree to the{' '}
				<Link href={PAGES.TERMS_AND_CONDITIONS} {...props}>
					Terms & Conditions
				</Link>{' '}
				and acknowledge the{' '}
				<Link href={PAGES.PRIVACY_POLICY} {...props}>
					Privacy Policy
				</Link>{' '}
				and{' '}
				<Link href={PAGES.COOKIES} {...props}>
					Cookie Policy
				</Link>
				.
			</div>
		),
		type: 'checkbox',
		placeholder:
			'I agree to the Terms & Conditions and acknowledge the Privacy Policy and Cookie Policy.',
		autoComplete: 'off',
	},
];
