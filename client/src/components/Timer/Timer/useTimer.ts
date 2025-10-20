'use client';

import { getSleepStatus, updateSleepStatus } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { ISleepEntry } from '@/types';
import { formatTime } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export const useTimer = () => {
	const { user } = useAuth();

	const [isSleeping, setIsSleeping] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [finishedSleep, setFinishedSleep] = useState<ISleepEntry | null>(null);
	const [timer, setTimer] = useState(0);
	const [initialTime, setInitialTime] = useState<Date | null>(null);
	const [formatedTimer, setFormattedTimer] = useState(formatTime(timer));
	const interval = useRef<null | ReturnType<typeof setInterval>>(null);

	const { data, isLoading, isFetched } = useQuery({
		queryKey: QUERY_KEYS.timer.one(user?.id || ''),
		queryFn: getSleepStatus,
		enabled: !!user?.id,
		retry: false,
	});

	const { mutate: update, isPending } = useMutation({
		mutationFn: updateSleepStatus,
		mutationKey: QUERY_KEYS.timer.update(user?.id || ''),
		onSuccess: (data) => {
			if (!!data.sleepEntry) setFinishedSleep(data.sleepEntry);
		},
	});

	useEffect(() => {
		if (data) {
			setIsSleeping(data.isSleeping);
			setInitialTime(data.sleepStart ? new Date(data.sleepStart) : null);
		}
	}, [data]);

	const startTimer = () => {
		if (isSleeping) return;

		setIsSleeping(true);
		setTimer(0);
		setIsFinished(false);
		setFormattedTimer(formatTime(0));
		setInitialTime(new Date());
		update();
	};

	useEffect(() => {
		if (!isSleeping || !initialTime) return;

		const start = initialTime.getTime() || 0;

		interval.current = setInterval(() => {
			setTimer(Math.floor((Date.now() - start) / 1000));
		}, 1000);

		return () => {
			if (interval.current) clearInterval(interval.current);
		};
	}, [isSleeping, initialTime]);

	useEffect(() => {
		setFormattedTimer(formatTime(timer));
	}, [timer]);

	const stopTimer = () => {
		setIsSleeping(false);
		setIsFinished(true);
		setFinishedSleep(null);
		update();
		if (interval.current) clearInterval(interval.current);
	};

	return {
		formatedTimer,
		isSleeping,
		isFinished,
		finishedSleep,
		isPending,
		isLoading,
		isFetched,
		startTimer,
		stopTimer,
	};
};
