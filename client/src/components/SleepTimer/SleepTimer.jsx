import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useTimer } from '../../hooks/useTimer';

import EndSleep from './EndSleep/EndSleep';

import Button from '../Button/Button';
import styles from './SleepTimer.module.scss';

const labels = ['Hours', 'Minutes', 'Seconds'];

const SleepTimer = () => {
	const { timer, isSleeping, sleepFinished, startTimer, stopTimer } =
		useTimer();
	const { isLogin, checkAuth } = useAuth();

	const navigate = useNavigate();

	const handleContolTimer = () => {
		checkAuth();

		if (!isLogin) {
			navigate('/login');
			return;
		}

		isSleeping ? stopTimer() : startTimer();
	};

	return (
		<div className={styles['sleep-timer']}>
			<div className={styles['sleep-timer-time-container']}>
				<div className={styles['sleep-timer-time']}>
					{timer.map((time, index) => (
						<div className={styles['sleep-timer-time-item']} key={index}>
							<div className={styles['sleep-timer-time-item-time']}>{time}</div>
							<p className={styles['sleep-timer-time-item-label']}>
								{labels[index]}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className={styles['sleep-timer-control']}>
				{Object.keys(sleepFinished).length > 0 ? (
					<EndSleep data={sleepFinished} />
				) : (
					<Button onClick={handleContolTimer}>
						{isSleeping ? 'Stop Timer' : 'Start Timer'}
					</Button>
				)}
			</div>
		</div>
	);
};

export default SleepTimer;
