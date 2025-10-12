'use client';

import FormLabel from '../FormLabel/FormLabel';
import ClearButton from './ClearButton/ClearButton';
import OptionsMenu from './OptionsMenu/OptionsMenu';
import styles from './Select.module.scss';
import { SelectProps } from './Select.types';
import SelectArrow from './SelectArrow/SelectArrow';
import { selectInputVariants } from './selectStyles';
import { useCustomSelect } from './useCustomSelect';

export default function Select({
	options,
	placeholder,
	onChange = () => {},
	label,
	isClearable = false,
	isSearchable = false,
	error,
	fullWidth = false,
}: SelectProps) {
	const {
		inputRef,
		menuRef,
		id,
		selectedValue,
		searchValue,
		showMenu,
		highlightedIndex,
		handleOpen,
		handleBlur,
		handleClear,
		handleKeyDown,
		handleSelect,
		getFilteredOptions,
		setShowMenu,
		setHighlightedIndex,
		setSearchValue,
	} = useCustomSelect({
		options,
		isSearchable,
		onChange,
	});

	const inputStyles = selectInputVariants({
		fullWidth,
		isClearable,
	});

	const fullWidthStyles = fullWidth ? styles['full-width--true'] : '';

	return (
		<div className={`${styles['select']} ${fullWidthStyles}`}>
			{!!label && <FormLabel id={id}>{label}</FormLabel>}
			<div
				ref={menuRef}
				tabIndex={-1}
				className={`${styles['select__container']} ${fullWidthStyles} ${
					!!error ? styles['error'] : ''
				}`}
				onClick={(e) => {
					e.stopPropagation();
					if (inputRef.current) inputRef.current.focus();
				}}
				onKeyDown={handleKeyDown}
				onBlur={(e) => {
					if (!e.currentTarget.contains(e.relatedTarget as Node)) {
						setShowMenu(false);
						setHighlightedIndex(-1);
					}
				}}
			>
				<input
					type="text"
					ref={inputRef}
					readOnly={!isSearchable}
					className={inputStyles}
					placeholder={placeholder}
					id={id}
					onFocus={handleOpen}
					autoComplete="off"
					onClick={(e) => {
						e.stopPropagation();
						handleOpen();
					}}
					value={
						isSearchable
							? searchValue || selectedValue?.label || ''
							: selectedValue?.label || ''
					}
					onChange={(e) => {
						if (isSearchable) {
							setSearchValue(e.target.value);
							setShowMenu(true);
							setHighlightedIndex(0);
						}
					}}
					onBlur={handleBlur}
				/>
				<div className={styles['select__arrow-container']}>
					{isClearable && !!selectedValue && (
						<ClearButton onClick={handleClear} />
					)}
					<SelectArrow showMenu={showMenu} />
				</div>
			</div>
			{showMenu && (
				<OptionsMenu
					getFilteredOptions={getFilteredOptions}
					highlightedIndex={highlightedIndex}
					handleSelect={handleSelect}
				/>
			)}
			{error && <p className={styles['error__text']}>{error}</p>}
		</div>
	);
}
