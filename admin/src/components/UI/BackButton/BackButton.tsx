'use client';

import { useRouter } from 'next/navigation';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Button } from '../Button';
import { BackButtonProps } from './BackButton.types';

export const BackButton = ({ onBack, buttonProps }: BackButtonProps) => {
	const router = useRouter();

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			router.back();
		}
	};

	return (
		<Button
			onClick={handleBack}
			variant={buttonProps?.variant || 'text'}
			color={buttonProps?.color || 'primary'}
			size={buttonProps?.size || 'sm'}
			{...buttonProps}
		>
			<MdOutlineArrowBack /> Back
		</Button>
	);
};
