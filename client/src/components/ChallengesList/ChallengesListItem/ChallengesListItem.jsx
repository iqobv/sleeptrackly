import Button from '../../Button/Button';
import styles from './ChallengesListItem.module.scss';

const ChallengesListItem = ({ data }) => {
	if (!data) return null;

	return (
		<li className={styles['challenges-list-item']}>
			<div className={styles['challenges-list-item-info']}>
				<p className={styles['challenges-list-item-info-tag']}>Challenge</p>
				<div className={styles['challenges-list-item-info-content']}>
					<h3 className={styles['challenges-list-item-info-title']}>
						{data.title}
					</h3>
					<p className={styles['challenges-list-item-info-text']}>
						{data.description}
					</p>
				</div>
				<div className={styles['challenges-list-item-info-actions']}>
					<Button
						isLink
						to={`/challenges/${data._id}`}
						variant="filled"
						color="secondary"
					>
						View Progress
					</Button>
				</div>
			</div>
		</li>
	);
};

export default ChallengesListItem;
