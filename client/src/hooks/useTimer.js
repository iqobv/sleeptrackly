import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	fetchSleepStatusByUserId,
	updateSleepStatus,
} from '../api/sleepStatus';

export const useTimer = () => {
	const [timer, setTimer] = useState(0);
	const [initialTime, setInitialTime] = useState(null);
	const [formatedTimer, setFormattedTimer] = useState(['00', '00', '00']);
	const interval = useRef(null);
	const { userId } = useSelector((state) => state.user);
	const [isSleeping, setIsSleeping] = useState(false);
	const [sleepFinished, setSleepFinished] = useState({});

	const { data, isLoading, refetch, error, isError } = useQuery({
		queryKey: ['timer', userId],
		queryFn: () => fetchSleepStatusByUserId(userId),
		enabled: !!userId,
	});

	const { mutate: updateSleep } = useMutation({
		mutationFn: (userId) => updateSleepStatus(userId),
		onSuccess: (data) => {
			setSleepFinished(data?.sleepEntry || {});
			refetch();
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to update sleep status');
		},
	});

	useEffect(() => {
		if (!isLoading && data) {
			if (data.isSleeping && data.sleepStart?.date) {
				const startDate = new Date(data.sleepStart.date);
				if (!isNaN(startDate.getTime())) {
					setInitialTime(startDate.toISOString());
					setIsSleeping(true);
				}
			} else {
				setIsSleeping(false);
			}
		}
	}, [data, isLoading]);

	useEffect(() => {
		if (!initialTime || !isSleeping) return;

		const start = new Date(initialTime).getTime();

		interval.current = setInterval(() => {
			setTimer(Math.floor((Date.now() - start) / 1000));
		}, 1000);

		return () => clearInterval(interval.current);
	}, [initialTime, isSleeping]);

	const startTimer = () => {
		if (interval.current) return;

		setIsSleeping(true);

		if (!initialTime) {
			const now = new Date().toISOString();
			setInitialTime(now);
			setTimer(0);
		}

		updateSleep(userId);
	};

	const stopTimer = () => {
		if (interval.current !== null) {
			updateSleep(userId);
			clearInterval(interval.current);
			interval.current = null;
			setIsSleeping(false);
		}
	};

	const formatTime = () => {
		const hours = Math.floor(timer / 3600);
		const minutes = Math.floor((timer % 3600) / 60);
		const seconds = timer % 60;

		setFormattedTimer([
			hours.toString().padStart(2, '0'),
			minutes.toString().padStart(2, '0'),
			seconds.toString().padStart(2, '0'),
		]);
	};

	useEffect(() => {
		formatTime();
	}, [timer]);

	return {
		timer: formatedTimer,
		isSleeping,
		sleepFinished,
		startTimer,
		stopTimer,
	};
};
