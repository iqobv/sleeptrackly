'use client';

import { Button, SectionHeader } from '@/components/UI';
import { ChallengeFull, ChallengeTask } from '@/types';
import Default from './Default/Default';
import styles from './TaskSummary.module.scss';
import { useTaskSummary } from './useTaskSummary';

interface TaskSummaryProps {
	selectedDate: ChallengeTask | null;
	challenge: ChallengeFull;
}

const TaskSummary = ({ selectedDate, challenge }: TaskSummaryProps) => {
	const { info, canUpdate, isCompleted, handleMarkAsCompleted } =
		useTaskSummary({
			challenge,
			selectedDate,
		});

	return (
		<div className={styles.summary}>
			<SectionHeader
				title="Selected Date Task"
				titleComponent="h3"
				containerClassName={styles.title}
				description={info ? `Selected date: ${info}` : ''}
			/>
			{selectedDate ? (
				<>
					<div className={styles.item}>
						<div className={styles.info}>
							<p className={styles.name}>{selectedDate.description}</p>
							<p className={styles.target}>
								Target: {selectedDate.targetValue}
							</p>
						</div>
						<div className={styles.status}>
							{canUpdate ? (
								<Button
									onClick={handleMarkAsCompleted}
									disabled={!canUpdate}
									fullWidth
								>
									Mark as completed
								</Button>
							) : (
								<Button
									disabled
									variant="text"
									fullWidth
									className={styles['completed']}
								>
									{isCompleted ? 'Completed' : 'Not completed'}
								</Button>
							)}
						</div>
					</div>
				</>
			) : (
				<Default />
			)}
		</div>
	);
};

export default TaskSummary;
