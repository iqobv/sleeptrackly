'use client';

import { useEffect, useState } from 'react';

interface FeaturedShopCarouselCountdownProps {
	endDate: Date;
}

export const FeaturedShopCarouselCountdown = ({
	endDate,
}: FeaturedShopCarouselCountdownProps) => {
	const [timeLeft, setTimeLeft] = useState<string>('');

	useEffect(() => {
		const updateCountdown = () => {
			const now = new Date();
			const difference = endDate.getTime() - now.getTime();

			if (difference <= 0) {
				setTimeLeft('Expired');
				return;
			}

			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			if (days > 0) {
				setTimeLeft(
					`${days}d ${hours.toString().padStart(2, '0')}:${minutes
						.toString()
						.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
				);
				return;
			}

			setTimeLeft(
				`${hours.toString().padStart(2, '0')}:${minutes
					.toString()
					.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
			);
		};

		updateCountdown();
		const intervalId = setInterval(updateCountdown, 1000);

		return () => clearInterval(intervalId);
	}, [endDate]);

	return <div>Ends in: {timeLeft}</div>;
};
