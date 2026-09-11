'use client';

import { MdOutlineArrowBack } from 'react-icons/md';
import { Button } from '../Button/Button';
import { BackButtonProps } from './BackButton.types';

export const BackButton = ({
	variant = 'text',
	color = 'primary',
	size = 'sm',
	...props
}: BackButtonProps) => {
	return (
		<Button variant={variant} color={color} size={size} {...props}>
			<MdOutlineArrowBack /> Back
		</Button>
	);
};
