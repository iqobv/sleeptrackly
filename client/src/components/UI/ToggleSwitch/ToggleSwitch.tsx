'use client';

import { useId } from 'react';
import styles from './ToggleSwitch.module.scss';
import { ToggleSwitchTypes } from './ToggleSwitch.types';

export const ToggleSwitch = ({
	checked,
	onChange,
	disabled,
	label,
	id,
	ref,
	...rest
}: ToggleSwitchTypes) => {
	const generatedId = useId();
	const elId = id || generatedId;

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;

		if (onChange) {
			onChange(e);
		}
	};

	return (
		<div className={styles.switch}>
			<label htmlFor={elId} className={styles.container}>
				<input
					id={elId}
					ref={ref}
					type="checkbox"
					checked={checked}
					onChange={handleToggle}
					disabled={disabled}
					className={styles.checkbox}
					{...rest}
				/>
				<span className={styles.slider} />
			</label>
			{label && (
				<label htmlFor={elId} className={styles.label}>
					{label}
				</label>
			)}
		</div>
	);
};
