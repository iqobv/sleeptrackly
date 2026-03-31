import { MdCopyright } from 'react-icons/md';
import styles from './Footer.module.scss';

const FooterCopyright = () => {
	return (
		<div className={styles['footer__copyright']}>
			<MdCopyright /> {new Date().getFullYear()} Sleeptrackly. All rights
			reserved.
		</div>
	);
};

export default FooterCopyright;
