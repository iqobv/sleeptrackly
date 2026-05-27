'use client';

import clsx from 'clsx';
import { MouseEvent, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import TextareaAutosize from 'react-textarea-autosize';
import { useField } from '../Field/FieldContext';
import inputStyles from '../Input/Input.module.scss';
import styles from './Textarea.module.scss';
import { TextareaProps } from './Textarea.types';

export const Textarea = ({
	className,
	error,
	disabled,
	leftSection,
	rightSection,
	minRows = 1,
	maxRows,
	ref,
	required,
	id,
	...props
}: TextareaProps) => {
	const field = useField({ id, error, disabled, required });

	const internalRef = useRef<HTMLTextAreaElement>(null);

	const containerClassNames = clsx(
		inputStyles.container,
		field.error && inputStyles.error,
		field.disabled && inputStyles.disabled,
		className,
	);

	const handleSectionClick = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		if (!target.closest('button')) {
			internalRef.current?.focus();
		}
	};

	return (
		<div
			className={containerClassNames}
			style={{ height: 'auto', minHeight: 45, padding: '8px 12px' }}
			data-has-left={!!leftSection}
			data-has-right={!!rightSection}
		>
			{leftSection && (
				<div className={inputStyles.section} onClick={handleSectionClick}>
					{leftSection}
				</div>
			)}
			<TextareaAutosize
				ref={mergeRefs([ref, internalRef])}
				minRows={minRows}
				maxRows={maxRows}
				disabled={field.disabled}
				className={`${inputStyles.input} ${styles.textarea}`}
				required={field.required}
				id={field.id}
				{...props}
			/>
			{rightSection && (
				<div className={inputStyles.section} onClick={handleSectionClick}>
					{rightSection}
				</div>
			)}
		</div>
	);
};
