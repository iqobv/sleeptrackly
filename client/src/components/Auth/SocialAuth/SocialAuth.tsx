'use client';

import Google from './Buttons/Google';
import QrCode from './Buttons/QrCode';
import styles from './SocialAuth.module.scss';

const SocialAuth = () => {
	return (
		<div className={styles['social-auth']}>
			<div className={styles['social-auth__divider']}>
				<div className={styles['social-auth__divider-line']} />
				<span className={styles['social-auth__divider-text']}>
					Or continue with
				</span>
				<div className={styles['social-auth__divider-line']} />
			</div>
			<div className={styles['social-auth__buttons']}>
				<QrCode />
				<Google />
			</div>
		</div>
	);
};

export default SocialAuth;
