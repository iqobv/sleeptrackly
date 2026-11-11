import { IconType } from 'react-icons';
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from 'react-icons/md';

interface TrendingIcon {
	icon: IconType;
	condition: 'positive' | 'negative' | 'neutral';
}

export const getTrendingIcon = (
	value: number,
	treshold: number = 0,
): TrendingIcon => {
	if (value > treshold)
		return {
			condition: 'positive',
			icon: MdTrendingUp,
		};

	if (value < -treshold)
		return {
			condition: 'negative',
			icon: MdTrendingDown,
		};

	return {
		condition: 'neutral',
		icon: MdTrendingFlat,
	};
};
