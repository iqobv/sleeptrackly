import { formatTimeRange } from '@/utils/dateFomatter.util';
import { Typography } from '@shared/ui';
import { ClientDateRangeProps } from './ClientDateRange.types';

export const ClientDateRange = ({
	start,
	end,
	...typographyProps
}: ClientDateRangeProps) => {
	const formattedRange = formatTimeRange(start, end);

	if (!formattedRange) return null;

	return (
		<Typography as="span" suppressHydrationWarning {...typographyProps}>
			{formattedRange[0]} - {formattedRange[1]}
		</Typography>
	);
};
