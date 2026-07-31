'use client';

import { deleteChallenge } from '@/api/challenge/deleteChallenge.api';
import { DeleteButton } from '@/components/UI';
import { QUERY_KEYS } from '@/config/queryClient.config';

interface DeleteChallengeProps {
	id: string;
	href?: string;
}

export const DeleteChallenge = ({ id, href }: DeleteChallengeProps) => {
	return (
		<DeleteButton
			title="Delete Challenge"
			text="Are you sure you want to delete this challenge? This action cannot be undone."
			mutationFn={deleteChallenge}
			id={id}
			queryInvalidateKey={QUERY_KEYS.challenge.all}
			onSuccessNavigateTo={href}
			buttonProps={{
				size: 'sm',
			}}
		/>
	);
};
