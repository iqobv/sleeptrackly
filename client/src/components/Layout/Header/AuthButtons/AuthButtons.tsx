'use client';

import { Button, Loader } from '@/components/UI';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import UserMenu from '../UserMenu/UserMenu';
import styles from './AuthButtons.module.scss';

interface AuthButtonsProps {
	closeMenu?: () => void;
}

const AuthButtons = ({ closeMenu = () => {} }: AuthButtonsProps) => {
	const { isAuthenticated, isloading, user, logout } = useAuth();

	const handleLogout = () => {
		logout();
		closeMenu();
	};

	return (
		<div className={styles['auth-buttons']}>
			{isloading ? (
				<Loader disablePadding />
			) : (
				<>
					{isAuthenticated ? (
						// <Button onClick={handleLogout}>Logout</Button>
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
