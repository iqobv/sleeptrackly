import { Auth } from '@/components/Auth/Auth/Auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Register',
};

export default function RegisterPage() {
	return <Auth isRegister />;
}
