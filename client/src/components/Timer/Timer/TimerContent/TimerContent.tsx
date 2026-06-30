import { Typography } from '@shared/ui';
import styles from './TimerContent.module.scss';

interface TimerContentProps {
	time: string[];
}

const labels = ['Hours', 'Minutes', 'Seconds'];

type TimeWithLabels = {
	value: string;
	label: (typeof labels)[number];
};

export const TimerContent = ({ time }: TimerContentProps) => {
	const finalTime = time.length === 3 ? time : ['00', '00', '00'];
	const timeWithLabels: TimeWithLabels[] = finalTime.map((t, index) => ({
		value: t,
		label: labels[index],
	}));

	return (
		<div className={styles.container}>
			{timeWithLabels.map((item) => (
				<div className={styles.item} key={item.label}>
					<Typography className={styles.value}>{item.value}</Typography>
					<Typography className={styles.label}>{item.label}</Typography>
				</div>
			))}
		</div>
	);
};
