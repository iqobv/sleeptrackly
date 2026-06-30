'use client';

import { getSleepStatus, updateSleepStatus } from '@/api/user/sleepStatus.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CHART_DATE_FORMAT } from '@/constants/dateFormat.constants';
import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { UserSleepStatusDto } from '@/dto/user/userSleepStatus.dto';
import { useAuth } from '@/hooks/useAuth.hook';
import { SleepEntry } from '@/types/dashboard/dashboard.types';
import { formatTime } from '@/utils/formatTime.util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

export const useTimer = () => {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const [isSleeping, setIsSleeping] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [finishedSleep, setFinishedSleep] = useState<SleepEntry | null>(null);
	const [timer, setTimer] = useState(0);
	const [initialTime, setInitialTime] = useState<Date | null>(null);
	const [formatedTimer, setFormattedTimer] = useState(formatTime(timer));
	const [finishTime, setFinishTime] = useState<Date | null>(null);
	const interval = useRef<null | ReturnType<typeof setInterval>>(null);

	const { data, isLoading, isFetched } = useQuery({
		queryKey: QUERY_KEYS.timer.one(user?.id || ''),
		queryFn: getSleepStatus,
		enabled: !!user?.id,
		retry: false,
	});

	const { mutate: update, isPending } = useMutation({
		mutationFn: (dto: UserSleepStatusDto) => updateSleepStatus(dto),
		mutationKey: QUERY_KEYS.timer.update(user?.id || ''),
		onSuccess: (data) => {
			if (data.sleepEntry) setFinishedSleep(data.sleepEntry);
			if (data.reward && data.reward.rewarded)
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.coin.userCoin,
				});
		},
		onError: () => {
			setIsSleeping(false);
			setIsFinished(false);
			setFinishedSleep(null);
			setTimer(0);
			setInitialTime(null);
			if (interval.current) clearInterval(interval.current);
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
		setFinishTime(null);
		update({});
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
		const now = new Date();

		setFinishTime(now);
		setIsSleeping(false);
		setIsFinished(true);
		setFinishedSleep(null);
		if (interval.current) clearInterval(interval.current);
	};

	const handleSaveSleep = (dto: UpdateSleepEntryDto) => {
		const { sleepEnd, ...rest } = dto;

		const dateForChart = sleepEnd
			? dayjs(sleepEnd).format(CHART_DATE_FORMAT)
			: finishTime
				? dayjs(finishTime).format(CHART_DATE_FORMAT)
				: undefined;

		const finalDto: UserSleepStatusDto = {
			...rest,
			dateForChart,
		};

		update(finalDto);
	};

	const resumeTimer = () => {
		if (isSleeping || !initialTime) return;

		setIsSleeping(true);
		setIsFinished(false);
		setFinishTime(null);
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
		handleSaveSleep,
		resumeTimer,
	};
};
