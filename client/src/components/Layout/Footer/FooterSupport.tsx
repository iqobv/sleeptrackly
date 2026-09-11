import Link from 'next/link';
import styles from './Footer.module.scss';

export const FooterSupport = () => {
	return (
		<div className={styles.support}>
			<Link href="mailto:support@sleeptrackly.com">
				support@sleeptrackly.com
			</Link>
		</div>
	);
};
