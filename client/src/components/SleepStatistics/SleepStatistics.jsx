import SleepChart from './SleepChart/SleepChart';
import styles from './SleepStatistics.module.scss';
import StatByDays from './StatByDays/StatByDays';
import Stats from './Stats/Stats';

const SleepStatistics = ({ data }) => {
	const { statistics, days } = data;

	return (
		<div className={styles['sleep-statistics']}>
			{statistics && <Stats data={statistics} />}
			{days && <SleepChart data={days} />}
			{days && <StatByDays days={days} />}
		</div>
	);
};

export default SleepStatistics;
