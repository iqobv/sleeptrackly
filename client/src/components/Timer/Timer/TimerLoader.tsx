import { SectionHeader, SkeletonLoader } from '@shared/ui';
import { ReminderLoader } from './Reminder/ReminderLoader';
import styles from './Timer.module.scss';
import { TimerButtonLoader } from './TimerButtonLoader';
import { TimerContentSkeleton } from './TimerContent/TimerContentLoader';

export const TimerLoader = () => {
	return (
		<div className="container">
			<SectionHeader
				title={<SkeletonLoader width={180} height={48} />}
				titleProps={{ as: 'div' }}
			/>
			<div className={styles.timer}>
				<TimerContentSkeleton />
				<TimerButtonLoader />
				<ReminderLoader />
			</div>
		</div>
	);
};
