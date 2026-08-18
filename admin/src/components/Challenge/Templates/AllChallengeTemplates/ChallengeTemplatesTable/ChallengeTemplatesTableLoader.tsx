'use client';

import { TableLoader } from '@shared/tables';
import { SkeletonLoader } from '@shared/ui';
import { CHALLENGE_TEMPLATES_TABLE_COLUMNS } from './challengeTemplatesTableColumns';

export const ChallengeTemplatesTableLoader = () => (
	<TableLoader columns={CHALLENGE_TEMPLATES_TABLE_COLUMNS}>
		<SkeletonLoader height={40} />
	</TableLoader>
);
