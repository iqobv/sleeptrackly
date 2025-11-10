'use client';

import { IOption } from '@/types';
import { useEffect, useId, useRef, useState } from 'react';

export const useCustomSelect = ({
	options,
	isSearchable,
	onChange,
	initialValue,
}: {
	options: IOption[];
	isSearchable?: boolean;
	onChange?: (option: IOption | null) => void;
	initialValue?: IOption | null;
}) => {
	const [selectedValue, setSelectedValue] = useState<IOption | null>(
		initialValue ?? null
	);
	const [showMenu, setShowMenu] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

	const inputRef = useRef<HTMLInputElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const id = useId();

	useEffect(() => {
		if (initialValue) {
			setSelectedValue(initialValue);
			setSearchTerm('');
		}
	}, [initialValue]);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setShowMenu(false);
			}
		};
		document.addEventListener('click', handler);
		return () => document.removeEventListener('click', handler);
	}, []);

	const getFilteredOptions = () => {
		if (!isSearchable || !searchTerm.trim()) return options;
		return options.filter((opt) =>
			opt.label.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	const filteredOptions = getFilteredOptions();

	const handleFocus = () => {
		setShowMenu(true);
		if (selectedValue) {
			const currentIndex = filteredOptions.findIndex(
				(opt) => opt.value === selectedValue.value
			);
			setHighlightedIndex(currentIndex > -1 ? currentIndex : 0);
		} else {
			setHighlightedIndex(0);
		}
	};

	const handleSelect = (opt: IOption) => {
		setSelectedValue(opt);
		onChange?.(opt);
		setShowMenu(false);
		setSearchTerm('');
		setHighlightedIndex(-1);
		inputRef.current?.focus();
	};

	const handleClear = () => {
		setSelectedValue(null);
		onChange?.(null);
		setSearchTerm('');
		setHighlightedIndex(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				e.preventDefault();
				if (showMenu && highlightedIndex >= 0) {
					handleSelect(filteredOptions[highlightedIndex]);
				} else {
					setShowMenu(true);
				}
				break;
			case 'ArrowDown':
				e.preventDefault();
				if (!showMenu) setShowMenu(true);
				setHighlightedIndex((prev) =>
					prev < filteredOptions.length - 1 ? prev + 1 : 0
				);
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (!showMenu) setShowMenu(true);
				setHighlightedIndex((prev) =>
					prev > 0 ? prev - 1 : filteredOptions.length - 1
				);
				break;
			case 'Escape':
				setShowMenu(false);
				setHighlightedIndex(-1);
				break;
			case 'Tab':
				setShowMenu(false);
				break;
		}
	};

	const displayValue = isSearchable
		? searchTerm || selectedValue?.label || ''
		: selectedValue?.label || '';

	const activeDescendant =
		highlightedIndex >= 0 && filteredOptions[highlightedIndex]
			? `${id}-option-${filteredOptions[highlightedIndex].value}`
			: undefined;

	return {
		id,
		inputRef,
		menuRef,
		selectedValue,
		showMenu,
		highlightedIndex,
		displayValue,
		activeDescendant,
		getFilteredOptions,
		handleSelect,
		handleClear,
		handleKeyDown,
		handleFocus,
		setShowMenu,
		setSearchTerm,
	};
};
