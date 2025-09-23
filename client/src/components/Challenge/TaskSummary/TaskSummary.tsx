'use client';

import { Button, PageHeader } from '@/components/UI';
import { useTaskSummary } from '@/hooks';
import { IChallengeFull, IChallengeTask } from '@/types';
import Default from './Default/Default';
import styles from './TaskSummary.module.scss';

interface TaskSummaryProps {
	selectedDate: IChallengeTask | null;
	challenge: IChallengeFull;
}

const TaskSummary = ({ selectedDate, challenge }: TaskSummaryProps) => {
	const { info, canUpdate, isCompleted, handleMarkAsCompleted } =
		useTaskSummary({
			challenge,
			selectedDate,
		});

	return (
		<div className={styles['task-summary']}>
			<PageHeader
				title="Selected Date Task"
				titleComponent="h3"
				containerClassName={styles['task-summary__title']}
				description={info ? `Selected date: ${info}` : ''}
			/>
			{selectedDate ? (
				<>
					<div className={styles['task-summary__item']}>
						<div className={styles['task-summary__info']}>
							<p className={styles['task-summary__name']}>
								{selectedDate.description}
							</p>
							<p className={styles['task-summary__target']}>
								Target: {selectedDate.targetValue}
							</p>
						</div>
						<div className={styles['task-summary__status']}>
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
