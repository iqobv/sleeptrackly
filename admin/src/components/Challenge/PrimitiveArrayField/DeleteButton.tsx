'use client';

import { Button } from '@shared/ui';
import { MdDelete } from 'react-icons/md';

interface DeleteButtonProps {
	onClick: () => void;
	length: number;
}

export const DeleteButton = ({ onClick, length }: DeleteButtonProps) => {
	return (
		<Button
			variant="text"
			color="danger"
			isIcon
			isRounded
			type="button"
			onClick={onClick}
			disabled={length <= 1}
		>
			<MdDelete size={20} />
		</Button>
	);
};
