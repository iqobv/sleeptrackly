'use client';

import { IconType } from 'react-icons';
import styles from './EmailConfirmationStates.module.scss';

interface EmailConfirmationStateWrapperProps {
	children: React.ReactNode;
	icon: IconType;
}

export const EmailConfirmationStateWrapper = ({
	children,
	icon: Icon,
}: EmailConfirmationStateWrapperProps) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.icon}>
				<Icon />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};
