import { MdCopyright } from 'react-icons/md';
import styles from './Footer.module.scss';

const FooterCopyright = () => {
	return (
		<div className={styles.copyright}>
			<MdCopyright /> {new Date().getFullYear()} Sleeptrackly. All rights
			reserved.
		</div>
	);
};

export default FooterCopyright;
