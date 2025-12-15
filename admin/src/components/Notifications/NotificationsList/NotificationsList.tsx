'use client';

import CreateNotification from './CreateNotification/CreateNotification';
import styles from './NotificationsList.module.scss';

const NotificationsList = () => {
	return (
		<div className={styles['notifications-list']}>
			<CreateNotification />
		</div>
	);
};

export default NotificationsList;
