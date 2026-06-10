'use client';

import { getAchievementById, updateAchievement } from '@/api';
import { PageWrapper } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { UpdateAchievementDto } from '@/dto';
import { updateAchievementSchema } from '@/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { AchievementForm } from '../AchievementForm/AchievementForm';
import { EditAchievementDelete } from './EditAchievementDelete';

export const EditAchievement = () => {
	const queryClient = useQueryClient();

	const { id } = useParams<{ id: string }>();

	const { data } = useQuery({
		queryKey: QUERY_KEYS.achievement.detail(id),
		queryFn: () => getAchievementById(id),
		enabled: !!id,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdateAchievementDto) => updateAchievement(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.achievement.detail(id),
			});
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.achievement.lists });
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to update achievement');
		},
	});

	return (
		<PageWrapper
			title="Edit Achievement"
			customRightSlot={<EditAchievementDelete id={id} />}
			showBackButton
		>
			<AchievementForm<UpdateAchievementDto>
				schema={updateAchievementSchema}
				onSubmit={(data) => mutate(data)}
				defaultValues={{
					icon: undefined,
					isActive: true,
					isHidden: false,
					rewardCoins: 0,
					rewardProductId: null,
					targetValue: 0,
					translations: [
						{
							language: 'en',
							title: '',
							description: '',
						},
					],
					type: undefined,
				}}
				iconUrl={data?.iconUrl}
				values={{
					isActive: data?.isActive,
					isHidden: data?.isHidden,
					rewardCoins: data?.rewardCoins,
					rewardProductId: data?.rewardProductId,
					targetValue: data?.targetValue,
					type: data?.type,
					translations: data?.translations.map((t) => ({
						language: t.language,
						title: t.title,
						description: t.description,
					})),
				}}
				initData={data}
				isLoading={isPending}
			/>
		</PageWrapper>
	);
};
