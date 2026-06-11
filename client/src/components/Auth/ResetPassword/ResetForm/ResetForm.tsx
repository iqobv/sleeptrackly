'use client';

import { Button } from '@shared/ui';
import { ChangeEventHandler } from 'react';
import styles from './ResetForm.module.scss';

interface ResetFormProps {
	children: React.ReactNode;
	buttonText: string;
	onSubmit: ChangeEventHandler<HTMLFormElement>;
	isPending?: boolean;
}

export const ResetForm = ({
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
