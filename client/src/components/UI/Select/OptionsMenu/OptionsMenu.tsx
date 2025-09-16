'use client';

import { IOption } from '@/types';
import styles from './OptionsMenu.module.scss';

interface OptionsMenuProps {
	highlightedIndex: number;
	handleSelect: (opt: IOption) => void;
	getFilteredOptions: () => IOption[];
}

export default function OptionsMenu({
	highlightedIndex,
	handleSelect,
	getFilteredOptions,
}: OptionsMenuProps) {
	const filtered = getFilteredOptions();

	return (
		<div className={styles['select__menu']}>
			{filtered.map((opt, i) => (
				<div
					key={opt.value}
					tabIndex={1}
					className={`${styles['select__option']} ${
						i === highlightedIndex ? styles['select__option--highlighted'] : ''
					}`}
					onMouseDown={(e) => {
						e.preventDefault();
						handleSelect(opt);
					}}
				>
					{opt.label}
				</div>
			))}
			{filtered.length === 0 && (
				<div className={styles['select__no-options']}>No options found</div>
			)}
		</div>
	);
}
