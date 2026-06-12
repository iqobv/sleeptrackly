'use client';

import { createAchievement } from '@/api/achievement/createAchievement.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { CreateAchievementDto } from '@/dto/achievement/achievement.dto';
import { createAchievementSchema } from '@/schemas/achievement/createAchievement.schema';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AchievementForm } from '../AchievementForm/AchievementForm';

export const CreateAchievement = () => {
	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationFn: (data: CreateAchievementDto) => createAchievement(data),
		onSuccess: (data) => {
			push(PAGES.ACHIEVEMENT(data.id));
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to create achievement');
		},
	});

	return (
		<PageWrapper title="Create Achievement">
			<AchievementForm<CreateAchievementDto>
				schema={createAchievementSchema}
				onSubmit={(data) => mutate(data)}
				defaultValues={{
					type: undefined,
					targetValue: 0,
					icon: undefined,
					isActive: true,
					isHidden: false,
					rewardCoins: 0,
					rewardProductId: null,
					translations: [
						{
							language: 'en',
							title: '',
							description: '',
						},
					],
				}}
			/>
		</PageWrapper>
	);
};
