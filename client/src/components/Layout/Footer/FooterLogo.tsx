import { NavLogo } from '@/components/UI';
import styles from './Footer.module.scss';

export const FooterLogo = () => {
	return (
		<div className={styles.logo}>
			<NavLogo logoProps={{ fill: 'var(--footer-logo-fill)' }} />
		</div>
	);
};
