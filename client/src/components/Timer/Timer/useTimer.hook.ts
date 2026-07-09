'use client';

import { getSleepStatus, updateSleepStatus } from '@/api/user/sleepStatus.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CHART_DATE_FORMAT } from '@/constants/dateFormat.constants';
import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { UserSleepStatusDto } from '@/dto/user/userSleepStatus.dto';
import { SleepEntry } from '@/types/dashboard/dashboard.types';
import { formatTime } from '@/utils/formatTime.util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

export type UseTimerReturnType = ReturnType<typeof useTimer>;

export const useTimer = () => {
	const queryClient = useQueryClient();

	const { data, isLoading, isFetched } = useQuery({
		queryKey: QUERY_KEYS.timer.one,
		queryFn: getSleepStatus,
		retry: false,
	});

	const [isSleeping, setIsSleeping] = useState(() => data?.isSleeping ?? false);
	const [initialTime, setInitialTime] = useState<Date | null>(() =>
		data?.sleepStart ? new Date(data.sleepStart) : null,
	);
	const [isFinished, setIsFinished] = useState(false);
	const [finishedSleep, setFinishedSleep] = useState<SleepEntry | null>(null);
	const [timer, setTimer] = useState(0);
	const [formatedTimer, setFormattedTimer] = useState(formatTime(timer));
	const [finishTime, setFinishTime] = useState<Date | null>(null);
	const interval = useRef<null | ReturnType<typeof setInterval>>(null);

	const { mutate: update, isPending } = useMutation({
		mutationFn: (dto?: UserSleepStatusDto) => updateSleepStatus(dto),
		onSuccess: (data) => {
			if (data.sleepEntry) {
				setFinishedSleep(data.sleepEntry);
				setFinishTime(
					data.sleepEntry.sleepEnd ? new Date(data.sleepEntry.sleepEnd) : null,
				);
			}
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

	const startTimer = () => {
		if (isSleeping) return;

		setIsSleeping(true);
		setTimer(0);
		setIsFinished(false);
		setFormattedTimer(formatTime(0));
		setInitialTime(new Date());
		setFinishTime(null);
		update(undefined);
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

	const stopTimer = () => {
		const now = new Date();

		queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.timer.one,
		});

		setFinishTime(now);
		setIsSleeping(false);
		setIsFinished(true);
		setFinishedSleep(null);
		if (interval.current) clearInterval(interval.current);
	};

	const handleSaveSleep = (dto: UpdateSleepEntryDto) => {
		const { sleepEnd, rating, sleepStart, timezone, isEdited } = dto;

		const dateForChart = sleepEnd
			? dayjs(sleepEnd).format(CHART_DATE_FORMAT)
			: finishTime
				? dayjs(finishTime).format(CHART_DATE_FORMAT)
				: dayjs().format(CHART_DATE_FORMAT);

		const finalDto: UserSleepStatusDto = {
			sleepStart,
			rating: rating || 1,
			sleepEnd:
				sleepEnd || finishTime?.toISOString() || new Date().toISOString(),
			dateForChart,
			timezone,
			isEdited,
		};

		update(finalDto);
	};

	const resumeTimer = () => {
		if (isSleeping || !initialTime) return;

		setIsSleeping(true);
		setIsFinished(false);
		setFinishTime(null);
	};

	const resetTimer = () => {
		setIsSleeping(false);
		setIsFinished(false);
		setFinishedSleep(null);
		setTimer(0);
		setInitialTime(null);
		setFormattedTimer(formatTime(0));
		setFinishTime(null);
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
		finishTime,
		sleepStatus: data,
		startTimer,
		stopTimer,
		handleSaveSleep,
		resumeTimer,
		resetTimer,
	};
};
