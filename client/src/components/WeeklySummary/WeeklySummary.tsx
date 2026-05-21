'use client';

import { Modal } from '../UI';
import styles from './WeeklySummary.module.scss';
import WeeklySummaryBody from './WeeklySummaryBody';

interface WeeklySummaryProps {
	id: string;
}

const WeeklySummary = ({ id }: WeeklySummaryProps) => {
	return (
		<Modal.Content className={styles.modal}>
			<Modal.Header>Weekly Summary</Modal.Header>
			<Modal.Body>
				<WeeklySummaryBody id={id} />
			</Modal.Body>
		</Modal.Content>
	);
};

export default WeeklySummary;
