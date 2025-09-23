'use client';

import { IOption } from '@/types';
import { useEffect, useId, useRef, useState } from 'react';

export const useCustomSelect = ({
	options,
	isSearchable,
	onChange,
}: {
	options: IOption[];
	isSearchable?: boolean;
	onChange?: (option: IOption | null) => void;
}) => {
	const [selectedValue, setSelectedValue] = useState<IOption | null>(null);
	const [showMenu, setShowMenu] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const id = useId();

	const handler = (e: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
			setShowMenu(false);
			setHighlightedIndex(-1);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handler);
		return () => {
			document.removeEventListener('click', handler);
		};
	}, []);

	const getFilteredOptions = () => {
		if (!isSearchable || !searchValue.trim()) return options;
		return options.filter((opt) =>
			opt.label.toLowerCase().includes(searchValue.toLowerCase()),
		);
	};

	const handleSelect = (opt: IOption) => {
		setSelectedValue(opt);
		setShowMenu(false);
		onChange?.(opt);
		setSearchValue('');
		setHighlightedIndex(-1);
	};

	const handleClear = () => {
		setSelectedValue(null);
		setSearchValue('');
		onChange?.(null);
		setShowMenu(false);
		setHighlightedIndex(-1);
	};

	const handleOpen = () => setShowMenu((prev) => !prev);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const filtered = getFilteredOptions();
		if (!showMenu) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlightedIndex((prev) =>
				prev < filtered.length - 1 ? prev + 1 : 0,
			);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlightedIndex((prev) =>
				prev > 0 ? prev - 1 : filtered.length - 1,
			);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
				handleSelect(filtered[highlightedIndex]);
			}
		} else if (e.key === 'Escape') {
			setShowMenu(false);
			setHighlightedIndex(-1);
		}
	};

	const handleBlur = () => {
		if (!isSearchable) return;

		const match = options.find(
			(opt) => opt.label.toLowerCase() === searchValue.toLowerCase(),
		);

		if (match) handleSelect(match);
		else setSearchValue('');
	};

	return {
		id,
		inputRef,
		menuRef,
		selectedValue,
		showMenu,
		searchValue,
		highlightedIndex,
		getFilteredOptions,
		handleSelect,
		handleClear,
		handleOpen,
		handleKeyDown,
		handleBlur,
		setSelectedValue,
		setShowMenu,
		setHighlightedIndex,
		setSearchValue,
	};
};
