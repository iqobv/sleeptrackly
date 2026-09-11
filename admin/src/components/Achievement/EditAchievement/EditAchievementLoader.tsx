import { PageWrapperLoader } from '@/components/UI';
import { AchievementFormLoader } from '../AchievementForm/AchievementFormLoader';

export const EditAchievementLoader = () => (
	<PageWrapperLoader showBackButton customRightSlot>
		<AchievementFormLoader />
	</PageWrapperLoader>
);
