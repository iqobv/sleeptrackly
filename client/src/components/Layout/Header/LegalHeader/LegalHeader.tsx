import { NavLogo } from '@/components/UI';
import Header from '../Header';
import styles from './LegalHeader.module.scss';

const LegalHeader = () => {
	return (
		<Header containerClassName={styles.legalHeader}>
			<NavLogo />
		</Header>
	);
};

export default LegalHeader;
