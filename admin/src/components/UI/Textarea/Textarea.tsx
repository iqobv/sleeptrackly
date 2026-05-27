'use client';

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

	const containerClassNames = [
		inputStyles.container,
		field.error && inputStyles.error,
		field.disabled && inputStyles.disabled,
		className,
	]
		.filter(Boolean)
		.join(' ');

	const handleSectionClick = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		if (!target.closest('button')) {
			internalRef.current?.focus();
		}
	};

	return (
		<div
			className={containerClassNames}
			style={{
				height: 'auto',
				minHeight: '2.8125rem',
				padding: '0.5rem 0.75rem',
			}}
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
