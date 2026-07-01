'use client';

import { Reminder } from './Reminder/Reminder';
import styles from './Timer.module.scss';
import { TimerInner } from './TimerInner';

export const Timer = () => {
	return (
		<div className={styles.timer}>
			<TimerInner />
			<Reminder />
		</div>
	);
};
