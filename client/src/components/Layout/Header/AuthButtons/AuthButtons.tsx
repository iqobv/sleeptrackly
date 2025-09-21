'use client';

import { Button, Loader } from '@/components/UI';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import UserMenu from '../UserMenu/UserMenu';
import styles from './AuthButtons.module.scss';

const AuthButtons = () => {
	const { isAuthenticated, isloading } = useAuth();

	return (
		<div className={styles['auth-buttons']}>
			{isloading ? (
				<Loader disablePadding />
			) : (
				<>
					{isAuthenticated ? (
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
