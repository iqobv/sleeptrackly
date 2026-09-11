'use client';

import { Typography } from '@shared/ui';
import { formatDate } from '@shared/utils';
import { ClientDateProps } from './ClientDate.types';

export const ClientDate = ({
	date,
	options,
	...typographyProps
}: ClientDateProps) => {
	const parsedDate = new Date(date);
	const isValidDate = !Number.isNaN(parsedDate.getTime());

	if (!isValidDate) return null;

	const formattedDate = formatDate(date, options);

	return (
		<Typography
			as="time"
			dateTime={parsedDate.toISOString()}
			suppressHydrationWarning
			{...typographyProps}
		>
			{formattedDate}
		</Typography>
	);
};
