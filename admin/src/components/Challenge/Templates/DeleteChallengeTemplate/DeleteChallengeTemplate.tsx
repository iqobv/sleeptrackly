'use client';

import { deleteChallengeTemplate } from '@/api/challenge/templates/deleteChallengeTemplate.api';
import { DeleteButton } from '@/components/UI';
import { QUERY_KEYS } from '@/config/queryClient.config';

interface DeleteChallengeTemplateProps {
	id: string;
	href?: string;
}

export const DeleteChallengeTemplate = ({
	id,
	href,
}: DeleteChallengeTemplateProps) => {
	return (
		<DeleteButton
			title="Delete Challenge Template"
			text="Are you sure you want to delete this challenge template? This action cannot be undone."
			mutationFn={deleteChallengeTemplate}
			id={id}
			queryInvalidateKey={QUERY_KEYS.challenge.allTemplates}
			onSuccessNavigateTo={href}
			buttonProps={{
				size: 'sm',
			}}
		/>
	);
};
