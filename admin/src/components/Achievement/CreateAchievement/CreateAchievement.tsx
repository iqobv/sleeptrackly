'use client';

import { createAchievement } from '@/api';
import { PAGES } from '@/config';
import { CreateAchievementDto } from '@/dto';
import { createAchievementSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AchievementForm } from '../AchievementForm';

const CreateAchievement = () => {
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
	);
};

export default CreateAchievement;
