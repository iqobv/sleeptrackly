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
	onChange,
	label,
	isClearable = false,
	isSearchable = false,
	error,
	fullWidth = false,
}: SelectProps) {
	const {
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
	} = useCustomSelect({ options, isSearchable, onChange });

	const inputStyles = selectInputVariants({ fullWidth, isClearable });
	const fullWidthStyles = fullWidth ? styles['full-width--true'] : '';

	const handleContainerClick = () => {
		if (!showMenu) {
			handleFocus();
		} else {
			setShowMenu(false);
		}
	};

	return (
		<div className={`${styles['select']} ${fullWidthStyles}`}>
			{label && <FormLabel id={id}>{label}</FormLabel>}
			<div
				ref={menuRef}
				role="combobox"
				aria-haspopup="listbox"
				aria-expanded={showMenu}
				aria-labelledby={label ? `${id}-label` : undefined}
				aria-controls={showMenu ? `${id}-listbox` : undefined}
				className={`${styles['select__container']} ${
					error ? styles['error'] : ''
				}`}
				onKeyDown={handleKeyDown}
				onClick={handleContainerClick}
			>
				<input
					ref={inputRef}
					type="text"
					className={inputStyles}
					placeholder={placeholder}
					id={id}
					readOnly={!isSearchable}
					value={displayValue}
					onFocus={handleFocus}
					onClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => {
						e.stopPropagation();
						e.preventDefault();
						handleFocus();
					}}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setShowMenu(true);
					}}
					aria-activedescendant={activeDescendant}
					aria-autocomplete="list"
					autoComplete="off"
				/>
				<div className={styles['select__arrow-container']}>
					{isClearable && selectedValue && (
						<ClearButton onClick={handleClear} />
					)}
					<SelectArrow showMenu={showMenu} />
				</div>
			</div>
			{showMenu && (
				<OptionsMenu
					listboxId={`${id}-listbox`}
					idPrefix={id}
					highlightedIndex={highlightedIndex}
					handleSelect={handleSelect}
					getFilteredOptions={getFilteredOptions}
				/>
			)}
			{error && <p className={styles['error__text']}>{error}</p>}
		</div>
	);
}
