import styles from './Dashboard.module.scss';
import { DashboardCardsLoader } from './DashboardCards/DashboardCardsLoader';
import { DashboardPaginationLoader } from './DashboardPagination/DashboardPaginationLoader';

export const DashboardLoader = () => (
	<div className={styles.container}>
		<DashboardPaginationLoader />
		<DashboardCardsLoader />
	</div>
);
