import Link from 'next/link';
import styles from '../Footer.module.scss';
import { FOOTER_LINKS } from './footerLinksItems';

const FooterLinks = () => {
	return (
		<div className={styles['footer__links']}>
			{FOOTER_LINKS.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={styles['footer__link']}
				>
					{link.label}
				</Link>
			))}
		</div>
	);
};

export default FooterLinks;
