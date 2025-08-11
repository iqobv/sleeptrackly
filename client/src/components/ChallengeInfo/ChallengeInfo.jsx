import dayjs from 'dayjs';

import styles from './ChallengeInfo.module.scss';

const formatDate = (date) => dayjs(date).format('DD.MM.YYYY HH:mm');

const ChallengeInfo = ({ data }) => {
	if (!data) return null;

	return (
		<div className={`section ${styles['challenge-info']}`}>
			<h3 className={styles['challenge-info-title']}>{data?.title}</h3>
			<p className={styles['challenge-info-text']}>{data?.description}</p>
			<div className={styles['challenge-info-dates']}>
				<p className={styles['challenge-info-text']}>
					Start date:{' '}
					<span className={styles['challenge-info-value']}>
						{formatDate(data?.startDate?.date)}
					</span>
				</p>
				<p className={styles['challenge-info-text']}>
					End date:{' '}
					<span className={styles['challenge-info-value']}>
						{formatDate(data?.endDate?.date)}
					</span>
				</p>
			</div>
			<p className={styles['challenge-info-text']}>
				Frequency:{' '}
				<span className={styles['challenge-info-value']}>
					{(data?.frequency).charAt(0).toUpperCase() + data?.frequency.slice(1)}
				</span>
			</p>
			<div>
				{!data?.isCompleted && (
					<p className={styles['challenge-info-text']}>
						Started:{' '}
						<span className={styles['challenge-info-value']}>
							{data?.isStarted ? 'Yes' : 'No'}
						</span>
					</p>
				)}
				<p className={styles['challenge-info-text']}>
					Completed:{' '}
					<span className={styles['challenge-info-value']}>
						{data?.isCompleted ? 'Yes' : 'No'}
					</span>
				</p>
			</div>
		</div>
	);
};

export default ChallengeInfo;
