'use client';

import { InputHTMLAttributes, KeyboardEvent, Ref } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Input } from '../Input/Input';
import { SelectValue } from '../Select/Select.types';
import { useSelectContext } from '../Select/SelectContext';
import styles from './FormSelect.module.scss';

interface FormSelectInputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'className'
> {
	currentValue: SelectValue | undefined;
	isOpen: boolean;
	placeholder?: string;
	formatValue: (val: SelectValue | undefined) => string;
	className?: string;
	ref?: Ref<HTMLDivElement>;
}

export const FormSelectInput = ({
	ref,
	currentValue,
	isOpen,
	placeholder,
	formatValue,
	className = '',
	...props
}: FormSelectInputProps) => {
	const { type: _radixType, ...restRadixProps } = props;
	const { setIsOpen, triggerRef } = useSelectContext();

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			setIsOpen(true);
		}
	};

	return (
		<Input
			ref={triggerRef as Ref<HTMLInputElement>}
			wrapperRef={ref}
			wrapperProps={restRadixProps}
			type="text"
			readOnly
			placeholder={placeholder}
			value={formatValue(currentValue)}
			className={className}
			inputStyle={{ cursor: 'pointer', textOverflow: 'ellipsis' }}
			onKeyDown={handleKeyDown}
			rightSection={
				<div className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
					<IoMdArrowDropdown size={25} />
				</div>
			}
		/>
	);
};
