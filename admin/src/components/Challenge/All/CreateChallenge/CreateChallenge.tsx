'use client';

import { createChallenge } from '@/api/challenge/createChallenge.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CreateChallengeDto } from '@/dto/challenge/challenge.dto';
import { createChallengeSchema } from '@/schemas/challenge/createChallenge.schema';
import { Form } from '@shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ChallengeForm } from '../ChallengeForm/ChallengeForm';

export const CreateChallenge = () => {
	const queryClient = useQueryClient();

	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreateChallengeDto) => createChallenge(data),
	});

	return (
		<PageWrapper title="Create Challenge" description="Create a new challenge">
			<Form<CreateChallengeDto>
				schema={createChallengeSchema}
				defaultValues={{
					type: 'SLEEP_DURATION',
					metadata: { minDurationMinutes: 60 },
					availableFrom: undefined,
					availableTo: undefined,
					dailyRewardCoins: 0,
					durationDays: 0,
					maxRecoveries: 0,
					rewardCoins: 0,
					rewardProductId: null,
					targetValue: 0,
					tier: 'TIER_1',
					translations: [
						{
							language: 'en',
							title: '',
							description: '',
						},
					],
					visibility: 'DRAFT',
				}}
				onSubmit={(data) =>
					mutate(data, {
						onSuccess: (data) => {
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.challenge.lists(),
							});

							router.push(PAGES.CHALLENGE(data.id));
						},
						onError: (error) => {
							if (isAxiosError(error) && error.response?.data?.message) {
								toast.error(error.response.data.message);
								return;
							}

							toast.error('Failed to create challenge');
						},
					})
				}
			>
				<ChallengeForm isEditing={false} isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
