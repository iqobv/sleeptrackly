'use client';

import { ModalBody, ModalContent, ModalHeader } from '../UI';
import styles from './WeeklySummary.module.scss';
import WeeklySummaryBody from './WeeklySummaryBody';

interface WeeklySummaryProps {
	id: string;
}

const WeeklySummary = ({ id }: WeeklySummaryProps) => {
	return (
		<ModalContent className={styles.modal}>
			<ModalHeader>Weekly Summary</ModalHeader>
			<ModalBody>
				<WeeklySummaryBody id={id} />
			</ModalBody>
		</ModalContent>
	);
};

export default WeeklySummary;
