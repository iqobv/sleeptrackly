'use client';

import { Button } from '@shared/ui';
import { useState } from 'react';
import styles from './Timer.module.scss';
import { TimerButtonLoader } from './TimerButtonLoader';
import { TimerContent } from './TimerContent/TimerContent';
import { TimerContentLoader } from './TimerContent/TimerContentLoader';
import { TimerEnd } from './TimerEnd/TimerEnd';
import { TimerReset } from './TimerReset';
import { useTimer } from './useTimer.hook';

export const TimerInner = () => {
	const {
		formatedTimer,
		isSleeping,
		isFinished,
		isPending,
		isLoading,
		isFetched,
		finishTime,
		finishedSleep,
		sleepStatus,
		startTimer,
		stopTimer,
		handleSaveSleep,
		resumeTimer,
		resetTimer,
	} = useTimer();

	const [wasManuallyClosed, setWasManuallyClosed] = useState(false);

	const open = isFinished && !wasManuallyClosed;

	const handleClick = () => {
		if (isSleeping) stopTimer();
		else startTimer();
	};

	const handleClose = () => setWasManuallyClosed((prev) => !prev);

	return (
		<>
			<div className={styles.timeContainer}>
				{isLoading || !isFetched ? (
					<TimerContentLoader />
				) : (
					<TimerContent time={formatedTimer} />
				)}
			</div>
			<div className={styles.control}>
				{isLoading || !isFetched ? (
					<TimerButtonLoader />
				) : (
					<>
						<TimerEnd
							finishTime={finishTime}
							sleepStatus={sleepStatus}
							handleSaveSleep={handleSaveSleep}
							resumeTimer={resumeTimer}
							finishedSleep={finishedSleep}
							open={open}
							onClose={handleClose}
						/>
						{finishedSleep ? (
							<Button
								onClick={() => {
									setWasManuallyClosed(false);
									resetTimer();
								}}
								loading={isPending}
							>
								Reset Timer
							</Button>
						) : (
							<>
								<Button onClick={handleClick} loading={isPending}>
									{isSleeping ? 'Stop Timer' : 'Start Timer'}
								</Button>
								{isSleeping && <TimerReset resetTimer={resetTimer} />}
							</>
						)}
					</>
				)}
			</div>
		</>
	);
};
