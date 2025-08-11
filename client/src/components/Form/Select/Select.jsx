import React from 'react';

import styles from './Select.module.scss';
import { useControlledField } from '../../../hooks/useControlledField';

const Select = ({
	name,
	control,
	label,
	fullWidth = false,
	options = [],
	rules = {},
	defaultValue = '',
}) => {
	const { field, error, invalid } = useControlledField({
		name,
		control,
		rules,
		defaultValue,
	});

	const classList = `${styles['select']} ${
		fullWidth ? styles['fullwidth'] : ''
	} ${error ? styles['error'] : ''} ${invalid ? styles['invalid'] : ''}`;

	return (
		<div className={styles['select-wrapper']}>
			{label && (
				<label htmlFor={name} className={styles['select-label']}>
					{label}
				</label>
			)}
			<select id={name} {...field} className={classList}>
				<option value="" disabled>
					Choose an option
				</option>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{error && <p className={styles['select-error']}>{error.message}</p>}
		</div>
	);
};

export default Select;
