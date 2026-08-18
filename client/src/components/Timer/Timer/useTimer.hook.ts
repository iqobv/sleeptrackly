'use client';

import {
	resetTimer as apiResetTimer,
	resumeTimer as apiResumeTimer,
	stopTimer as apiStopTimer,
	getSleepStatus,
	updateSleepStatus,
} from '@/api/user/sleepStatus.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CHART_DATE_FORMAT } from '@/constants/dateFormat.constants';
import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { UserSleepStatusDto } from '@/dto/user/userSleepStatus.dto';
import { SleepEntry } from '@/types/dashboard/dashboard.types';
import { formatTime } from '@/utils/formatTime.util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export type UseTimerReturnType = ReturnType<typeof useTimer>;

export const useTimer = () => {
	const queryClient = useQueryClient();
	const queryKey = QUERY_KEYS.timer.one;

	const { data, isLoading, isFetched } = useQuery({
		queryKey,
		queryFn: getSleepStatus,
		retry: false,
	});

	const { mutate: handleStopTimer } = useMutation({
		mutationFn: apiStopTimer,
	});
	const { mutate: handleResumeTimer } = useMutation({
		mutationFn: apiResumeTimer,
	});
	const { mutate: handleResetTimer } = useMutation({
		mutationFn: apiResetTimer,
	});

	const [isFinished, setIsFinished] = useState(false);
	const [finishedSleep, setFinishedSleep] = useState<SleepEntry | null>(null);
	const [finishTime, setFinishTime] = useState<Date | null>(null);
	const [timer, setTimer] = useState(0);

	const isSleeping = (data?.isSleeping ?? false) && !isFinished;
	const initialTime = data?.sleepStart ? new Date(data.sleepStart) : null;

	const formatedTimer = formatTime(timer);

	useEffect(() => {
		if (!isSleeping || !initialTime) {
			return;
		}

		const startMs = initialTime.getTime();

		const updateTimer = () => {
			setTimer(Math.floor((Date.now() - startMs) / 1000));
		};

		const timeoutId = setTimeout(updateTimer, 0);
		const intervalId = setInterval(updateTimer, 1000);

		return () => {
			clearTimeout(timeoutId);
			clearInterval(intervalId);
		};
	}, [isSleeping, initialTime]);

	const { mutate: update, isPending } = useMutation({
		mutationFn: (dto?: UserSleepStatusDto) => updateSleepStatus(dto),
		onSuccess: (responseData) => {
			if (responseData.sleepEntry) {
				setFinishedSleep(responseData.sleepEntry);
				setFinishTime(
					responseData.sleepEntry.sleepEnd
						? new Date(responseData.sleepEntry.sleepEnd)
						: null,
				);
			}
			if (responseData.reward && responseData.reward.rewarded) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.coin.userCoin,
				});
			}
			queryClient.invalidateQueries({ queryKey });
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey });
			setIsFinished(false);
			setFinishedSleep(null);
			setFinishTime(null);
		},
	});

	const startTimer = () => {
		if (isSleeping) return;
		setTimer(0);
		setIsFinished(false);
		setFinishTime(null);
		update(undefined);
	};

	const stopTimer = () => {
		if (!isSleeping) return;

		handleStopTimer(undefined, {
			onSuccess: (data) => {
				queryClient.setQueryData(queryKey, data);
			},
		});

		setIsFinished(true);
		setFinishTime(new Date());
	};

	const resumeTimer = () => {
		if (isSleeping || !initialTime) return;

		handleResumeTimer(undefined, {
			onSuccess: (data) => {
				queryClient.setQueryData(queryKey, data);
			},
		});

		setIsFinished(false);
		setFinishTime(null);
	};

	const resetTimer = () => {
		handleResetTimer(undefined, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey });
			},
		});

		setIsFinished(false);
		setFinishedSleep(null);
		setFinishTime(null);
		setTimer(0);
	};

	const handleSaveSleep = (dto: UpdateSleepEntryDto) => {
		const { sleepEnd, rating, sleepStart, timezone } = dto;
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
		};

		update(finalDto);
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
