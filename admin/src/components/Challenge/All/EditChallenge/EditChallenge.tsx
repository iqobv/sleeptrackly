'use client';

import { getChallengeById } from '@/api/challenge/getChallengeById.api';
import { updateChallenge } from '@/api/challenge/updteChallenge.api';
import { PageWrapper } from '@/components/UI';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdateChallengeDto } from '@/dto/challenge/challenge.dto';
import { updateChallengeSchema } from '@/schemas/challenge/updateChallenge.schema';
import { Form } from '@shared/form';
import { formatToUtcDatetimeLocal } from '@shared/utils';
import {
	skipToken,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ChallengeForm } from '../ChallengeForm/ChallengeForm';

export const EditChallenge = () => {
	const { id } = useParams<{ id: string }>();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdateChallengeDto) => updateChallenge(id, data),
	});

	const { data } = useQuery({
		queryKey: QUERY_KEYS.challenge.detail(id),
		queryFn: id ? () => getChallengeById(id) : skipToken,
	});

	const challengeValues = data
		? ({
				...data,
				availableFrom: data?.availableFrom
					? formatToUtcDatetimeLocal(data.availableFrom)
					: undefined,
				availableTo: data?.availableTo
					? formatToUtcDatetimeLocal(data.availableTo)
					: undefined,
			} as UpdateChallengeDto)
		: undefined;

	return (
		<PageWrapper title="Update Challenge" description="Update a challenge">
			<Form<UpdateChallengeDto>
				schema={updateChallengeSchema}
				defaultValues={{
					type: 'SLEEP_DURATION',
					metadata: { minDurationMinutes: 60 },
					availableFrom: undefined,
					availableTo: undefined,
					dailyRewardCoins: 0,
					durationDays: 0,
					maxRecoveries: 0,
					rewardCoins: 0,
					rewardProductId: undefined,
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
				values={challengeValues}
				onSubmit={(data) =>
					mutate(data, {
						onSuccess: () => {
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.challenge.detail(id),
							});
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.challenge.lists(),
							});
						},
						onError: (error) => {
							if (isAxiosError(error) && error.response?.data?.message) {
								toast.error(error.response.data.message);
								return;
							}

							toast.error('Failed to update challenge');
						},
					})
				}
			>
				<ChallengeForm isEditing isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
