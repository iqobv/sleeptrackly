'use client';

import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { Button } from '@shared/ui';
import styles from './AuthButtons.module.scss';

export const AuthButtons = () => {
	return (
		<div className={styles.authButtons}>
			<Button variant="link" color="primary" asChild size="sm">
				<a href={CROSS_DOMAIN_ROUTES.APP_LOGIN}>Login</a>
			</Button>
			<Button asChild size="sm">
				<a href={CROSS_DOMAIN_ROUTES.APP_REGISTER}>Register</a>
			</Button>
		</div>
	);
};
