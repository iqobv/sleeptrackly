'use client';

import { IOption } from '@/types';
import styles from './OptionsMenu.module.scss';

interface OptionsMenuProps {
	highlightedIndex: number;
	handleSelect: (opt: IOption) => void;
	getFilteredOptions: () => IOption[];
	idPrefix: string;
	listboxId: string;
}

export default function OptionsMenu({
	highlightedIndex,
	handleSelect,
	getFilteredOptions,
	idPrefix,
	listboxId,
}: OptionsMenuProps) {
	const filtered = getFilteredOptions();

	return (
		<div id={listboxId} role="listbox" className={styles['select__menu']}>
			{filtered.map((opt, i) => (
				<div
					key={opt.value}
					id={`${idPrefix}-option-${opt.value}`}
					role="option"
					aria-selected={i === highlightedIndex}
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
				<div className={styles['select__no-options']}>No options</div>
			)}
		</div>
	);
}
