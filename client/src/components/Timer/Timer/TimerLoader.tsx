import { SectionHeaderLoader } from '@shared/ui';
import { ReminderLoader } from './Reminder/ReminderLoader';
import styles from './Timer.module.scss';
import { TimerButtonLoader } from './TimerButtonLoader';
import { TimerContentSkeleton } from './TimerContent/TimerContentLoader';

export const TimerLoader = () => {
	return (
		<div className="container">
			<SectionHeaderLoader titleWidth={180} />
			<div className={styles.timer}>
				<TimerContentSkeleton />
				<TimerButtonLoader />
				<ReminderLoader />
			</div>
		</div>
	);
};
