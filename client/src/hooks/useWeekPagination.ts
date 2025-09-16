'use client';

import { useWeekStore } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useWeekPagination = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const selectedWeek = useWeekStore((state) => state.currentWeek);
	const setSelectedWeek = useWeekStore((state) => state.setCurrentWeek);

	useEffect(() => {
		const initialWeek = Number(searchParams.get('week')) || 0;
		setSelectedWeek(initialWeek);
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		params.set('week', selectedWeek.toString());
		setSelectedWeek(Number(selectedWeek));
		router.push(`?${params.toString()}`);
	}, [selectedWeek]);

	return {
		selectedWeek,
		setSelectedWeek,
	};
};
