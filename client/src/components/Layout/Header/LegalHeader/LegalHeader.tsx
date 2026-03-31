import Header from '../Header';
import { NavLogo } from '../HeaderInner';
import styles from './LegalHeader.module.scss';

const LegalHeader = () => {
	return (
		<Header containerClassName={styles['legal-header']}>
			<NavLogo />
		</Header>
	);
};

export default LegalHeader;
