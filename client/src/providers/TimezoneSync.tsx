'use client';

import { syncTimezone } from '@/api/user/syncTimezone.api';
import { useAuth } from '@/hooks/useAuth.hook';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export const TimezoneSync = () => {
	const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const { user, isLoading } = useAuth();

	const { mutate: updateTimezone } = useMutation({
		mutationFn: syncTimezone,
	});

	useEffect(() => {
		if (!user || isLoading) return;

		if (user.timezone === browserTz) return;

		updateTimezone({ timezone: browserTz });
	}, [user, browserTz]);

	return <></>;
};
