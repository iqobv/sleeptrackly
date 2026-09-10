'use client';

import { TableLoader } from '@shared/tables';
import { PaginationLoader, SkeletonLoader } from '@shared/ui';
import { CHALLENGES_TABLE_COLUMNS } from './challengesTableColumns';

export const ChallengesTableLoader = () => (
	<>
		<TableLoader columns={CHALLENGES_TABLE_COLUMNS}>
			<SkeletonLoader height={40} />
		</TableLoader>
		<PaginationLoader />
	</>
);
