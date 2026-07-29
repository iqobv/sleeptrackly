'use client';

import { getAllChallengeTemplates } from '@/api/challenge/templates/getAllTemplates.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { challengeTemplatesQuerySchema } from '@/schemas/challenge/challengeTemplatesQuery.schema';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import styles from './AllChallengeTemplates.module.scss';
import { ChallengeTemplatesTable } from './ChallengeTemplatesTable/ChallengeTemplatesTable';
import { ChallengeTemplatesTableFilters } from './ChallengeTemplatesTable/ChallengeTemplatesTableFilters';
import { useChallengeTemplatesFilters } from './useChallengeTemplatesFilters.hook';

export const AllChallengeTemplates = () => {
	const [filters] = useChallengeTemplatesFilters();

	const validatedParams = useMemo(
		() => challengeTemplatesQuerySchema.parse(filters),
		[filters],
	);

	const { data } = useQuery({
		queryKey: QUERY_KEYS.challenge.listTemplates(validatedParams),
		queryFn: () => getAllChallengeTemplates(validatedParams),
	});

	return (
		<PageWrapper
			title="Challenge Templates"
			description="Manage challenge templates. Creaete, edit, and delete templates to customize challenges for users."
			className={styles.allChallengeTemplates}
			showBackButton={false}
			buttonText="Create Template"
			href={PAGES.CHALLENGE_TEMPLATE_NEW}
		>
			<ChallengeTemplatesTableFilters />

			{data && data.meta.total > 0 && (
				<ChallengeTemplatesTable
					templates={data.items}
					totalPages={data.meta.totalPages}
				/>
			)}
		</PageWrapper>
	);
};
