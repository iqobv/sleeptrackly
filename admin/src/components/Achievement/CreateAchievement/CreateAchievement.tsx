'use client';

import { CreateAchievementDto } from '@/dto';
import { createAchievementSchema } from '@/schemas';
import AchievementForm from '../AchievementForm/AchievementForm';

const CreateAchievement = () => {
	return (
		<AchievementForm<CreateAchievementDto>
			schema={createAchievementSchema}
			onSubmit={(data) => console.log(data)}
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
