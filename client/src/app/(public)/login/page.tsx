import { Auth } from '@/components/Auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

export default function LoginPage() {
	return <Auth />;
}
