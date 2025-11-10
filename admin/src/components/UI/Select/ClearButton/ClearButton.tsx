'use client';

import { MdOutlineClose } from 'react-icons/md';
import styles from './ClearButton.module.scss';

interface ClearButtonProps {
	onClick: (e: React.MouseEvent) => void;
}

export default function ClearButton({ onClick }: ClearButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={styles['select__clear']}
			tabIndex={-1}
			onMouseDown={(e) => e.stopPropagation()}
		>
			<MdOutlineClose size={20} />
		</button>
	);
}
