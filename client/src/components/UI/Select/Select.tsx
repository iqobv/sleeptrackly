'use client';

import { Option } from '@/types';
import React, {
	forwardRef,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import ClearButton from './ClearButton/ClearButton';
import OptionsMenu from './OptionsMenu/OptionsMenu';
import styles from './Select.module.scss';
import SelectArrow from './SelectArrow/SelectArrow';

interface SelectProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange'
> {
	options: Option[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	label?: string;
	error?: string;
	isClearable?: boolean;
	containerClassName?: string;
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
	(
		{
			options,
			value,
			onChange,
			placeholder = 'Search...',
			label,
			error,
			isClearable = false,
			containerClassName = '',
			...props
		},
		ref,
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const [query, setQuery] = useState('');
		const [highlightedIndex, setHighlightedIndex] = useState(0);
		const [dropUp, setDropUp] = useState(false);

		const containerRef = useRef<HTMLDivElement>(null);
		const inputRef = useRef<HTMLInputElement>(null);

		const selectedOption = useMemo(
			() => options.find((opt) => opt.value === value),
			[options, value],
		);

		useLayoutEffect(() => {
			setQuery('');
		}, [value]);

		const filteredOptions = useMemo(() => {
			if (!query) return options;
			return options.filter((opt) =>
				opt.label.toLowerCase().includes(query.toLowerCase()),
			);
		}, [options, query]);

		useLayoutEffect(() => {
			if (isOpen && containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const spaceBelow = window.innerHeight - rect.bottom;
				const menuHeight = 220;

				setDropUp(spaceBelow < menuHeight && rect.top > menuHeight);
			}
		}, [isOpen]);

		useEffect(() => {
			const handleClickOutside = (e: MouseEvent) => {
				if (
					containerRef.current &&
					!containerRef.current.contains(e.target as Node)
				) {
					setIsOpen(false);
					setQuery('');
				}
			};
			document.addEventListener('mousedown', handleClickOutside);
			return () =>
				document.removeEventListener('mousedown', handleClickOutside);
		}, []);

		const handleSelect = (option: Option) => {
			onChange?.(option.value);
			setQuery('');
			setIsOpen(false);
			inputRef.current?.blur();
		};

		const handleInputFocus = () => {
			setIsOpen(true);
			setQuery('');
			const index = options.findIndex((opt) => opt.value === value);
			setHighlightedIndex(index !== -1 ? index : 0);
		};

		const onKeyDown = (e: React.KeyboardEvent) => {
			if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
				setIsOpen(true);
				return;
			}

			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
					break;
				case 'ArrowUp':
					e.preventDefault();
					setHighlightedIndex(
						(prev) =>
							(prev - 1 + filteredOptions.length) % filteredOptions.length,
					);
					break;
				case 'Enter':
					e.preventDefault();
					if (filteredOptions[highlightedIndex]) {
						handleSelect(filteredOptions[highlightedIndex]);
					}
					break;
				case 'Escape':
					setIsOpen(false);
					setQuery('');
					inputRef.current?.blur();
					break;
			}
		};

		return (
			<div
				className={`${styles.container} ${containerClassName}`}
				ref={containerRef}
			>
				{label && <label className={styles.label}>{label}</label>}

				<div
					className={`${styles.wrapper} ${error ? styles['wrapper--error'] : ''} ${isOpen ? styles['wrapper--active'] : ''}`}
					onClick={() => inputRef.current?.focus()}
				>
					<input
						{...props}
						ref={(node) => {
							inputRef.current = node;
							if (typeof ref === 'function') ref(node);
							else if (ref) ref.current = node;
						}}
						className={styles.input}
						value={isOpen ? query : selectedOption?.label || ''}
						onChange={(e) => {
							setQuery(e.target.value);
							if (!isOpen) setIsOpen(true);
							setHighlightedIndex(0);
						}}
						onFocus={handleInputFocus}
						onKeyDown={onKeyDown}
						placeholder={selectedOption ? selectedOption.label : placeholder}
						autoComplete="off"
					/>

					<div className={styles.actions} onClick={(e) => e.stopPropagation()}>
						{isClearable && value && (
							<ClearButton
								onClick={() => {
									onChange?.('');
									setQuery('');
								}}
							/>
						)}
						<SelectArrow showMenu={isOpen} onClick={() => setIsOpen(!isOpen)} />
					</div>
				</div>

				{isOpen && (
					<OptionsMenu
						filteredOptions={filteredOptions}
						handleSelect={handleSelect}
						highlightedIndex={highlightedIndex}
						value={value}
						setHighlightedIndex={setHighlightedIndex}
						dropUp={dropUp}
					/>
				)}

				{error && <span className={styles['error-message']}>{error}</span>}
			</div>
		);
	},
);

Select.displayName = 'Select';

export default Select;
