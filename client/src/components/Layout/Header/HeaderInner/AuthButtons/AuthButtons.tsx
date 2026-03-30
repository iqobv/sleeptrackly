'use client';

import { Button } from '@/components/UI';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import UserMenu from '../UserMenu/UserMenu';
import styles from './AuthButtons.module.scss';
import AuthButtonsLoader from './AuthButtonsLoader';

const AuthButtons = () => {
	const { user, isloading } = useAuth();

	return (
		<div className={styles['auth-buttons']}>
			{isloading ? (
				<AuthButtonsLoader />
			) : (
				<>
					{!!user ? (
						<UserMenu />
					) : (
						<>
							<Button href={PAGES.LOGIN} variant="link">
								Login
							</Button>
							<Button href={PAGES.REGISTER}>Register</Button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default AuthButtons;
