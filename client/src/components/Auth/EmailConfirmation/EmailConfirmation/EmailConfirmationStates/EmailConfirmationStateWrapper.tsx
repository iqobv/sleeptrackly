'use client';

import { IconType } from 'react-icons';

import styles from './EmailConfirmationStates.module.scss';

interface EmailConfirmationStateWrapperProps {
	children: React.ReactNode;
	icon: IconType;
}

const EmailConfirmationStateWrapper = ({
	children,
	icon: Icon,
}: EmailConfirmationStateWrapperProps) => {
	return (
		<div className={styles['email-confirmation-state-wrapper']}>
			<div className={styles['email-confirmation-state-wrapper__icon']}>
				<Icon />
			</div>
			<div className={styles['email-confirmation-state-wrapper__children']}>
				{children}
			</div>
		</div>
	);
};

export default EmailConfirmationStateWrapper;
