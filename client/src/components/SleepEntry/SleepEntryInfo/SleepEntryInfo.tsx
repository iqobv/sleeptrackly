'use client';

import { Divider } from '@shared/ui';
import dayjs from 'dayjs';
import styles from './SleepEntryInfo.module.scss';
import { SleepEntryInfoItem } from './SleepEntryInfoItem/SleepEntryInfoItem';

interface SleepEntryInfoProps {
	sleepStart: Date;
	sleepEnd: Date;
	isOnlyForm?: boolean;
	isCreate?: boolean;
	date?: Date;
}

export const SleepEntryInfo = ({
	sleepStart,
	sleepEnd,
	isCreate = false,
	isOnlyForm = false,
	date,
}: SleepEntryInfoProps) => {
	const minLocalString = dayjs(date ?? new Date())
		.subtract(1, 'day')
		.startOf('day')
		.format('YYYY-MM-DDTHH:mm');
	const maxLocalString = dayjs(date ?? new Date())
		.endOf('day')
		.format('YYYY-MM-DDTHH:mm');

	return (
		<div className={styles.info}>
			<SleepEntryInfoItem
				label="Sleep Start"
				value={sleepStart}
				name="sleepStart"
				isOnlyForm={isOnlyForm}
				isCreate={isCreate}
				minValue={minLocalString}
				maxValue={maxLocalString}
			/>
			<Divider />
			<SleepEntryInfoItem
				label="Sleep End"
				value={sleepEnd}
				name="sleepEnd"
				isOnlyForm={isOnlyForm}
				isCreate={isCreate}
				minValue={minLocalString}
				maxValue={maxLocalString}
			/>
		</div>
	);
};
