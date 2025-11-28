'use client';

import { useId } from 'react';
import styles from './ToggleSwitch.module.scss';
import { ToggleSwitchProps } from './ToggleSwitch.types';

const ToggleSwitch = ({
	checked,
	onChange,
	disabled,
	label,
	id,
}: ToggleSwitchProps) => {
	const generatedId = useId();
	const elId = id || generatedId;

	const handleToggle = () => {
		if (disabled) return;
		const newState = !checked;

		if (onChange) {
			onChange(newState);
		}
	};

	return (
		<div className={styles['switch']}>
			<label htmlFor={elId} className={styles['switch__container']}>
				<input
					id={elId}
					type="checkbox"
					checked={checked}
					onChange={handleToggle}
					disabled={disabled}
					className={styles['switch__checkbox']}
				/>
				<span className={styles['switch__slider']} />
			</label>
			{label && (
				<label htmlFor={elId} className={styles['switch__label']}>
					{label}
				</label>
			)}
		</div>
	);
};

export default ToggleSwitch;
