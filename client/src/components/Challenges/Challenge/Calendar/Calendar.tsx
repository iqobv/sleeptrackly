'use client';

import { CHART_DATE_FORMAT } from '@/constants/dateFormat.constants';
import { ChallengeFull } from '@/types/challenge/challenge.types';
import { ChallengeTaskStatus } from '@shared/types';
import { Typography } from '@shared/ui';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { IconBaseProps } from 'react-icons';
import { MdCheck, MdOutlineClose, MdRestore } from 'react-icons/md';
import { ChallengeCardContainer } from '../ChallengeCardContainer/ChallengeCardContainer';
import styles from './Calendar.module.scss';

dayjs.extend(isSameOrBefore);

interface CalendarProps {
	data: ChallengeFull;
}

interface CalendarDay {
	id: string;
	number: number;
	isToday: boolean;
	status: ChallengeTaskStatus;
}

const iconProps: IconBaseProps = {
	size: 24,
};

export const Calendar = ({ data }: CalendarProps) => {
	const durationDays = data.durationDays;

	const now = dayjs().format(CHART_DATE_FORMAT);

	const days: CalendarDay[] = Array.from({ length: durationDays }, (_, i) => ({
		id: `day-${i + 1}`,
		number: i + 1,
		isToday: !data.userChallenge
			? false
			: dayjs(data.userChallenge?.startDate).add(i, 'day').isSame(now, 'day'),
		status:
			data.userChallenge?.tasks.find((task) =>
				dayjs(task.date).isSame(
					dayjs(data.userChallenge?.startDate).add(i, 'day'),
					'day',
				),
			)?.status || ChallengeTaskStatus.PENDING,
	}));

	return (
		<ChallengeCardContainer
			title={
				<>
					<Typography color="inherit" variant="h5" as="span">
						Progress
					</Typography>
					<Typography color="inherit" variant="subtitle1" as="span">
						{data.userChallenge?.tasks.filter(
							(task, i) =>
								(task.status === ChallengeTaskStatus.COMPLETED ||
									task.status === ChallengeTaskStatus.RECOVERED) &&
								i < durationDays,
						).length ?? 0}{' '}
						of {durationDays} days completed
					</Typography>
				</>
			}
			titleProps={{ className: styles.title }}
			gap={20}
		>
			<div className={styles.calendar}>
				{days.map((day) => (
					<div key={day.id} className={styles.day}>
						<div className={styles.radial}>
							{day.status === ChallengeTaskStatus.COMPLETED && (
								<MdCheck {...iconProps} />
							)}
							{day.status === ChallengeTaskStatus.FAILED && (
								<MdOutlineClose {...iconProps} />
							)}
							{day.status === ChallengeTaskStatus.PENDING &&
								data.dailyRewardCoins > 0 && (
									<Typography>+{data.dailyRewardCoins}</Typography>
								)}
							{day.status === ChallengeTaskStatus.RECOVERED && (
								<MdRestore {...iconProps} />
							)}
						</div>
						<Typography>{day.isToday ? 'Today' : `D${day.number}`}</Typography>
					</div>
				))}
			</div>
		</ChallengeCardContainer>
	);
};
