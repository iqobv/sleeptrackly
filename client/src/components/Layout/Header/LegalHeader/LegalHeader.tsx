import { NavLogo } from '@/components/UI';
import { Header } from '../Header';
import styles from './LegalHeader.module.scss';

export const LegalHeader = () => (
	<Header containerClassName={styles.legalHeader}>
		<NavLogo />
	</Header>
);
