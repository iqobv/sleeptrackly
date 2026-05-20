'use client';

import { IconType } from 'react-icons';
import styles from './WeeklySummaryCard.module.scss';

interface WeeklySummaryCardProps {
	label: string;
	value: React.ReactNode;
	icon: IconType;
}

const WeeklySummaryCard = ({ icon, label, value }: WeeklySummaryCardProps) => {
	const Icon = icon;

	return (
		<div className={styles.card}>
			<Icon size={20} />
			<div className={styles.content}>
				<p className={styles.label}>{label}</p>
				<div className={styles.value}>{value}</div>
			</div>
		</div>
	);
};

export default WeeklySummaryCard;
