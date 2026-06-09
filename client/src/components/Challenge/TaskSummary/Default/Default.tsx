'use client';

import { Typography } from '@shared/ui';

export const Default = () => (
	<Typography variant="h6" as="p" color="secondary" weight="regular">
		No task scheduled for the selected date. Click on a date to view task.
	</Typography>
);
