import Link from 'next/link';
import styles from './Footer.module.scss';

const FooterSupport = () => {
	return (
		<div className={styles['footer__support']}>
			<Link href="mailto:support@sleeptrackly.com">
				support@sleeptrackly.com
			</Link>
		</div>
	);
};

export default FooterSupport;
