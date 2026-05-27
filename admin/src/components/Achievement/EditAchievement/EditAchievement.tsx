'use client';

import { getAchievementById, updateAchievement } from '@/api';
import { SectionHeader } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { UpdateAchievementDto } from '@/dto';
import { updateAchievementSchema } from '@/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AchievementForm } from '../AchievementForm';

export const EditAchievement = () => {
	const { back } = useRouter();

	const { id } = useParams<{ id: string }>();

	const { data, refetch } = useQuery({
		queryKey: QUERY_KEYS.achievement.byId(id),
		queryFn: () => getAchievementById(id),
		enabled: !!id,
	});

	const { mutate } = useMutation({
		mutationFn: (data: UpdateAchievementDto) => updateAchievement(id, data),
		onSuccess: () => {
			refetch();
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to update achievement');
		},
	});

	return (
		<div>
			<SectionHeader
				title="Edit Achievement"
				showBackButton
				onBackButtonClick={back}
			/>
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
			/>
		</div>
	);
};
