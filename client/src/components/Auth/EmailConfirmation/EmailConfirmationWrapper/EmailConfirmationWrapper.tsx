'use client';

import styles from './EmailConfirmationWrapper.module.scss';

interface EmailConfirmationWrapperProps {
	children: React.ReactNode;
}

const EmailConfirmationWrapper = ({
	children,
}: EmailConfirmationWrapperProps) => {
	return <div className={`${styles.wrapper} container`}>{children}</div>;
};

export default EmailConfirmationWrapper;
