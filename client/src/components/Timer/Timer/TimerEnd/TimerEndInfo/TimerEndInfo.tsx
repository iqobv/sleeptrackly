'use client';

import { Divider } from '@shared/ui';
import styles from './TimerEndInfo.module.scss';
import { TimerEndInfoItem } from './TimerEndInfoItem';

interface TimerEndInfoProps {
	sleepStart: Date;
	sleepEnd: Date;
}

export const TimerEndInfo = ({ sleepEnd, sleepStart }: TimerEndInfoProps) => {
	return (
		<div className={styles.info}>
			<TimerEndInfoItem
				label="Sleep Start"
				value={sleepStart}
				name="sleepStart"
			/>
			<Divider />
			<TimerEndInfoItem label="Sleep End" value={sleepEnd} name="sleepEnd" />
		</div>
	);
};
