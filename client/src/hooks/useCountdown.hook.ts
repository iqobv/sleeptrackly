'use client';

import {
	CountdownResult,
	getCountdownToNextMonday,
} from '@/utils/countdown.util';
import { useEffect, useState } from 'react';

export const useCountdown = (): CountdownResult => {
	const [countdown, setCountdown] = useState<CountdownResult>(
		getCountdownToNextMonday(),
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdown(getCountdownToNextMonday());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return countdown;
};
