'use client';

import { IoMdArrowDropdown } from 'react-icons/io';
import styles from './SelectArrow.module.scss';

interface SelectArrowProps {
	showMenu: boolean;
}

export default function SelectArrow({ showMenu }: SelectArrowProps) {
	return (
		<div
			className={`${styles['select__arrow']} ${
				showMenu ? styles['select__arrow--down'] : ''
			}`}
		>
			<IoMdArrowDropdown size={25} />
		</div>
	);
}
