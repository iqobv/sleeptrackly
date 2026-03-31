import { NavLogo } from '@/components/UI';
import styles from './Footer.module.scss';

const FooterLogo = () => {
	return (
		<div className={styles['footer__logo']}>
			<NavLogo logoProps={{ fill: 'var(--footer-logo-fill)' }} />
		</div>
	);
};

export default FooterLogo;
