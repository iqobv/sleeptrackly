import Link from 'next/link';
import styles from '../Footer.module.scss';
import { FOOTER_LINKS } from './footerLinksItems';

export const FooterLinks = () => {
	return (
		<div className={styles.links}>
			{FOOTER_LINKS.map((link) => (
				<Link key={link.href} href={link.href} className={styles.link}>
					{link.label}
				</Link>
			))}
		</div>
	);
};
