'use client';

import { Google } from './Buttons/Google';
import { QrCode } from './Buttons/QrCode/QrCode';
import styles from './SocialAuth.module.scss';

export const SocialAuth = () => {
	return (
		<div className={styles.socialAuth}>
			<div className={styles.divider}>
				<div className={styles.dividerLine} />
				<span className={styles.dividerText}>Or continue with</span>
				<div className={styles.dividerLine} />
			</div>
			<div className={styles.socialAuthButtons}>
				<QrCode />
				<Google />
			</div>
		</div>
	);
};
