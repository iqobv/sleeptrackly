'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useWeekPagination = () => {
	const [selectedWeek, setSelectedWeek] = useState(0);

	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const weekFromUrl = Number(searchParams.get('week')) || 0;

		if (weekFromUrl !== selectedWeek) setSelectedWeek(weekFromUrl);
	}, [searchParams, selectedWeek, setSelectedWeek]);

	const changeWeek = useCallback(
		(newWeek: number) => {
			const params = new URLSearchParams(searchParams);
			params.set('week', newWeek.toString());
			router.push(`?${params.toString()}`, { scroll: false });
		},
		[searchParams, router]
	);

	return {
		selectedWeek,
		changeWeek,
	};
};
