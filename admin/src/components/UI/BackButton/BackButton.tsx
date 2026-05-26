'use client';

import { MdOutlineArrowBack } from 'react-icons/md';
import { Button } from '../Button';
import { ButtonProps } from '../Button/Button.types';

interface BackButtonProps {
	onBack: () => void;
	buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
}

export const BackButton = ({ onBack, buttonProps }: BackButtonProps) => {
	return (
		<Button
			onClick={() => onBack()}
			variant={buttonProps?.variant || 'text'}
			color={buttonProps?.color || 'primary'}
			size={buttonProps?.size || 'sm'}
			{...buttonProps}
		>
			<MdOutlineArrowBack /> Back
		</Button>
	);
};
