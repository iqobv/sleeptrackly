'use client';

import { Button } from '@/components/UI';
import { ChangeEventHandler } from 'react';
import styles from './ResetForm.module.scss';

interface ResetFormProps {
	children: React.ReactNode;
	buttonText: string;
	onSubmit: ChangeEventHandler<HTMLFormElement>;
	isPending?: boolean;
}

const ResetForm = ({
	children,
	buttonText,
	onSubmit,
	isPending,
}: ResetFormProps) => {
	return (
		<form className={styles.resetForm} onSubmit={onSubmit}>
			{children}
			<Button fullWidth type="submit" disabled={isPending}>
				{buttonText}
			</Button>
		</form>
	);
};

export default ResetForm;
