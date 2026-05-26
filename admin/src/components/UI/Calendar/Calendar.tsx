'use client';

import { DayPicker, DayPickerProps } from 'react-day-picker';
import 'react-day-picker/style.css';
import styles from './Calendar.module.scss';

export const Calendar = (props: DayPickerProps) => {
	return (
		<DayPicker
			{...props}
			modifiersClassNames={{
				completed: styles.completed,
				pending: styles.pending,
				hidden: styles.hidden,
				...props.modifiersClassNames,
			}}
			weekStartsOn={1}
			navLayout="around"
			showOutsideDays={true}
		/>
	);
};
