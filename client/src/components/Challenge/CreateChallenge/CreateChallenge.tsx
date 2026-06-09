'use client';

import { createChallenge } from '@/api';
import { PRIVATE_PAGES } from '@/config';
import { CreateChallengeDto } from '@/dto';
import { createChallengeSchema } from '@/schemas';
import { Form } from '@shared/form';
import { SectionHeader } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ChallengeForm } from '../ChallengeForm/ChallengeForm';
import { CREATE_CHALLENGE_FIELDS } from './createChallengeFields';

export const CreateChallenge = () => {
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: (data: CreateChallengeDto) => createChallenge(data),
	});

	return (
		<div>
			<SectionHeader title="Create Challenge" />
			<Form<CreateChallengeDto>
				schema={createChallengeSchema}
				onSubmit={(data, _e, methods) => {
					mutate(data, {
						onSuccess: (data) =>
							router.push(PRIVATE_PAGES.CHALLENGES.BY_ID(data.id)),
						onError: (error) => {
							if (isAxiosError(error) && error.response?.data.field) {
								methods.setError(error.response.data.field, {
									message: error.response.data.message,
								});
								return;
							}

							toast.error(
								error.message ||
									'An error occurred while updating the challenge',
							);
						},
					});
				}}
			>
				<ChallengeForm<CreateChallengeDto>
					fields={CREATE_CHALLENGE_FIELDS}
					buttonLabel="Create"
					isEditing={false}
					isLoading={false}
				/>
			</Form>
		</div>
	);
};
