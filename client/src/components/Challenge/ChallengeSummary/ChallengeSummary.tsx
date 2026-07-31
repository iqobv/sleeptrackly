'use client';

import { ChallengeFull } from '@/types/challenge/challenge.types';
import { SectionHeader } from '@shared/ui';
import styles from './ChallengeSummary.module.scss';

interface ChallengeSummaryProps {
	data: ChallengeFull;
}

export const ChallengeSummary = ({ data }: ChallengeSummaryProps) => {
	return (
		<div className={styles.summary}>
			<SectionHeader
				title={data?.translation.title}
				description={data?.translation.description}
				titleProps={{
					variant: 'h2',
				}}
			/>
		</div>
	);
};
