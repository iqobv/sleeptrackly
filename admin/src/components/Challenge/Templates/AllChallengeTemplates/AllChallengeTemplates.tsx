'use client';

import { getAllChallengeTemplates } from '@/api/challenge/templates/getAllTemplates.api';
import { AddButton, PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { challengeTemplatesQuerySchema } from '@/schemas/challenge/templates/challengeTemplatesQuery.schema';
import { Button } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
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
			showBackButton={false}
			customRightSlot={
				<div className={styles.buttons}>
					<Button isIcon>
						<AddButton href={PAGES.CHALLENGE_TEMPLATE_NEW}>
							Create Template
						</AddButton>
					</Button>
					<Button isIcon color="secondary">
						<AddButton
							href={PAGES.CHALLENGE_TEMPLATE_NEW_BULK}
							customIcon={MdOutlinePlaylistAdd}
						>
							Bulk Create Templates
						</AddButton>
					</Button>
				</div>
			}
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
