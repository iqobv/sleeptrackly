import { DashboardCardLoader } from '../DashboardCard/DashboardCardLoader';
import styles from './DashboardCards.module.scss';

export const DashboardCardsLoader = () => (
	<div className={styles.cards}>
		{Array.from({ length: 8 }).map((_, index) => (
			<DashboardCardLoader key={index} />
		))}
	</div>
);
