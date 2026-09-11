import styles from './Footer.module.scss';
import { FooterCopyright } from './FooterCopyright';
import { FooterLinks } from './FooterLinks/FooterLinks';
import { FooterLogo } from './FooterLogo';
import { FooterSupport } from './FooterSupport';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<FooterLogo />
				<FooterLinks />
				<FooterSupport />
			</div>
			<FooterCopyright />
		</footer>
	);
};
