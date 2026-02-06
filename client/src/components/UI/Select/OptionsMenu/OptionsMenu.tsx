'use client';

import { IOption } from '@/types';
import styles from './OptionsMenu.module.scss';

interface OptionsMenuProps {
	filteredOptions: IOption[];
	highlightedIndex: number;
	value?: string;
	dropUp?: boolean;
	handleSelect: (option: IOption) => void;
	setHighlightedIndex: (index: number) => void;
}

export default function OptionsMenu({
	filteredOptions,
	highlightedIndex,
	value,
	dropUp = false,
	handleSelect,
	setHighlightedIndex,
}: OptionsMenuProps) {
	return (
		<div
			className={`${styles['options-menu']} ${dropUp ? styles['options-menu--drop-up'] : ''}`}
		>
			{filteredOptions.length > 0 ? (
				filteredOptions.map((option, index) => (
					<div
						key={option.value}
						className={`
                  ${styles['option']}
                  ${index === highlightedIndex ? styles['option--highlighted'] : ''}
                  ${value === option.value ? styles['option--selected'] : ''}
                `}
						onMouseEnter={() => setHighlightedIndex(index)}
						onClick={() => handleSelect(option)}
					>
						{option.label}
					</div>
				))
			) : (
				<div className={styles['no-options']}>No options found</div>
			)}
		</div>
	);
}
