'use client';

import { AUTH_PAGES } from '@/config/authPages.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { Button } from '@shared/ui';
import Link from 'next/link';
import { UserMenu } from '../UserMenu/UserMenu';
import styles from './AuthButtons.module.scss';
import { AuthButtonsLoader } from './AuthButtonsLoader';

export const AuthButtons = () => {
	const { user, isloading } = useAuth();

	console.log(isloading);

	return (
		<div className={styles.authButtons}>
			{isloading ? (
				<AuthButtonsLoader />
			) : (
				<>
					{user ? (
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
