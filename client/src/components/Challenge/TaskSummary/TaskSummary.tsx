'use client';

import {
	ChallengeFull,
	ChallengeTask,
} from '@/types/challenge/challenge.types';
import { Button, SectionHeader, Typography } from '@shared/ui';
import { Default } from './Default/Default';
import styles from './TaskSummary.module.scss';
import { useTaskSummary } from './useTaskSummary';

interface TaskSummaryProps {
	selectedDate: ChallengeTask | null;
	challenge: ChallengeFull;
}

export const TaskSummary = ({ selectedDate, challenge }: TaskSummaryProps) => {
	const { info, canUpdate, isCompleted, handleMarkAsCompleted } =
		useTaskSummary({
			challenge,
			selectedDate,
		});

	return (
		<div className={styles.summary}>
			<SectionHeader
				title="Selected Date Task"
				titleProps={{
					variant: 'h3',
				}}
				description={info ? `Selected date: ${info}` : ''}
			/>
			{selectedDate ? (
				<>
					<div className={styles.item}>
						<div className={styles.info}>
							<Typography variant="h6" as="p" weight="medium">
								{selectedDate.description}
							</Typography>
							<Typography color="secondary">
								Target: {selectedDate.targetValue}
							</Typography>
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
									className={styles.completed}
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
