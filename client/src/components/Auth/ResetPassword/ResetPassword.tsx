'use client';

import { SectionHeader } from '@/components/UI';
import { useSearchParams } from 'next/navigation';
import EmailField from './EmailField/EmailField';
import NewPasswordField from './NewPasswordField/NewPasswordField';
import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	console.log(token);

	return (
		<div className={styles['reset-password']}>
			<SectionHeader
				title="Reset Password"
				containerClassName={styles['reset-password__header']}
			/>
			<div className={styles['reset-password__container']}>
				{token ? <NewPasswordField token={token} /> : <EmailField />}
			</div>
		</div>
	);
};

export default ResetPassword;
