'use client';

import { IoMdArrowDropdown } from 'react-icons/io';
import styles from './SelectArrow.module.scss';

interface SelectArrowProps {
	showMenu: boolean;
	onClick: () => void;
}

export default function SelectArrow({ showMenu, onClick }: SelectArrowProps) {
	return (
		<div
			className={`${styles['select__arrow']} ${
				showMenu ? styles['select__arrow--down'] : ''
			}`}
			onClick={onClick}
		>
			<IoMdArrowDropdown size={25} />
		</div>
	);
}
