'use client';

import { Button, Loader } from '@/components/UI';
import styles from './Timer.module.scss';
import TimerEnd from './TimerEnd/TimerEnd';
import { useTimer } from './useTimer';

const labels = ['Hours', 'Minutes', 'Seconds'];

const Timer = () => {
	const {
		formatedTimer,
		isSleeping,
		isFinished,
		finishedSleep,
		isPending,
		startTimer,
		stopTimer,
	} = useTimer();

	const handleClick = () => {
		if (isSleeping) stopTimer();
		else startTimer();
	};

	return (
		<div className={styles['timer']}>
			<div className={styles['timer__time-container']}>
				<div className={styles['timer__time-container-inner']}>
					{formatedTimer.map((time, index) => (
						<div className={styles['timer__time-item']} key={index}>
							<div className={styles['timer__time-item-value']}>{time}</div>
							<p className={styles['timer__time-item-label']}>
								{labels[index]}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className={styles['timer__control']}>
				{isPending ? (
					<Loader />
				) : (
					<>
						{isFinished && !!finishedSleep ? (
							<TimerEnd data={finishedSleep} />
						) : (
							<Button onClick={handleClick}>
								{isSleeping ? 'Stop Timer' : 'Start Timer'}
							</Button>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Timer;
