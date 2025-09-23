'use client';

import { Button } from '@/components/UI';
import { FormEventHandler } from 'react';
import styles from './ResetForm.module.scss';

interface ResetFormProps {
	children: React.ReactNode;
	buttonText: string;
	onSubmit: FormEventHandler<HTMLFormElement>;
}

const ResetForm = ({ children, buttonText, onSubmit }: ResetFormProps) => {
	return (
		<form className={styles['reset-form']} onSubmit={onSubmit}>
			{children}
			<Button fullWidth type="submit">
				{buttonText}
			</Button>
		</form>
	);
};

export default ResetForm;
