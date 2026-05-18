'use client';

import { Button } from '@/components/UI';
import { AUTH_PAGES } from '@/config';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import UserMenu from '../UserMenu/UserMenu';
import styles from './AuthButtons.module.scss';
import AuthButtonsLoader from './AuthButtonsLoader';

const AuthButtons = () => {
	const { user, isloading } = useAuth();

	return (
		<div className={styles.authButtons}>
			{isloading ? (
				<AuthButtonsLoader />
			) : (
				<>
					{!!user ? (
						<UserMenu />
					) : (
						<>
							<Button variant="link" color="primary" asChild>
								<Link href={AUTH_PAGES.LOGIN}>Login</Link>
							</Button>
							<Button asChild>
								<Link href={AUTH_PAGES.REGISTER}>Register</Link>
							</Button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default AuthButtons;
