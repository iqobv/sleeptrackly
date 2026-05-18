'use client';

import styles from './Default.module.scss';

const Default = () => {
	return (
		<div className={styles.default}>
			No task scheduled for the selected date. Click on a date to view task.
		</div>
	);
};

export default Default;
