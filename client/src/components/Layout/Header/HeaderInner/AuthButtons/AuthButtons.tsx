'use client';

import { Button } from '@/components/UI';
import { AUTH_PAGES } from '@/config';
import { useAuth } from '@/hooks';
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
							<Button href={AUTH_PAGES.LOGIN} variant="link">
								Login
							</Button>
							<Button href={AUTH_PAGES.REGISTER}>Register</Button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default AuthButtons;
