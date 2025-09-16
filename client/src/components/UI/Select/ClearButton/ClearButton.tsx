'use client';

import { MdOutlineClose } from 'react-icons/md';
import styles from './ClearButton.module.scss';

interface ClearButtonProps {
	onClick: () => void;
}

export default function ClearButton({ onClick }: ClearButtonProps) {
	return (
		<button onClick={onClick} className={styles['select__clear']}>
			<MdOutlineClose size={20} />
		</button>
	);
}
