import { IconBaseProps } from 'react-icons';
import {
	BsBarChartFill,
	BsFillPersonFill,
	BsListTask,
	BsMoonStarsFill,
} from 'react-icons/bs';

export interface FeatureItem {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const iconProps: IconBaseProps = {
	size: 22,
};

export const FEATURES_ITEMS: FeatureItem[] = [
	{
		title: 'Sleep Duration Tracker',
		icon: <BsMoonStarsFill {...iconProps} />,
		description:
			'Easily start and stop the timer to accurately record your rest time.',
	},
	{
		title: 'Weekly Statistics',
		icon: <BsBarChartFill {...iconProps} />,
		description:
			'Visualize your sleep duration with clear, informative charts grouped by week.',
	},
	{
		title: 'Build Better Habits',
		icon: <BsListTask {...iconProps} />,
		description:
			'Go beyond sleep. Create custom daily and weekly challenges to build consistency and achieve any personal goal you set for yourself.',
	},
	{
		title: 'Track with Friends',
		icon: <BsFillPersonFill {...iconProps} />,
		description:
			"Add friends to see their real-time sleep status. Know who's currently tracking their sleep.",
	},
];
