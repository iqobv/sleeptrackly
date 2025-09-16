'use client';

import { Button, PageHeader } from '@/components/UI';
import { PAGES } from '@/config';
import { IChallengeFull } from '@/types/challenge.types';

import styles from './ChallengeSummary.module.scss';

interface ChallengeSummaryProps {
	data: IChallengeFull;
}

const ChallengeSummary = ({ data }: ChallengeSummaryProps) => {
	return (
		<div className={styles['summary']}>
			<PageHeader
				title={data?.title}
				description={data?.description}
				titleComponent="h2"
			/>
			<Button
				href={PAGES.EDIT_CHALLENGE(data?.id)}
				variant="outlined"
				className={styles['edit-challenge']}
			>
				Edit Challenge
			</Button>
		</div>
	);
};

export default ChallengeSummary;
