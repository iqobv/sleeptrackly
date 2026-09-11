'use client';

import { CreateSleepEntryFormDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { FormField } from '@shared/form';
import { Button, Input, InputProps, Typography } from '@shared/ui';
import { formatDate } from '@shared/utils';
import { useState } from 'react';
import { Path } from 'react-hook-form';
import { MdEdit, MdOutlineClose } from 'react-icons/md';
import styles from './SleepEntryInfoItem.module.scss';

interface SleepEntryInfoItemProps {
	label: React.ReactNode;
	value: Date;
	name: Path<CreateSleepEntryFormDto>;
	isCreate?: boolean;
	isOnlyForm?: boolean;
	minValue?: string;
	maxValue?: string;
}

export const SleepEntryInfoItem = ({
	label,
	name,
	value,
	isCreate = false,
	isOnlyForm = false,
	maxValue,
	minValue,
}: SleepEntryInfoItemProps) => {
	const [isEditMode, setIsEditMode] = useState(isOnlyForm);

	const handleClick = () => !isOnlyForm && setIsEditMode((prev) => !prev);

	const inputProps: InputProps = {
		type: 'datetime-local',
		step: '1',
		min: minValue,
		max: maxValue,
	};

	if (isOnlyForm) {
		return (
			<div className={styles.item}>
				<FormField
					name={name}
					label={label}
					required={isCreate}
					className={styles.formField}
				>
					<Input {...inputProps} inputClassName={styles.input} />
				</FormField>
			</div>
		);
	}

	return (
		<div className={styles.item}>
			<Typography color="secondary">{label}</Typography>
			<div className={styles.itemContent}>
				{isEditMode ? (
					<FormField name={name}>
						<Input {...inputProps} />
					</FormField>
				) : (
					<Typography>{formatDate(value)}</Typography>
				)}
				{!isOnlyForm && (
					<Button
						onClick={handleClick}
						size="sm"
						variant="text"
						color="secondary"
						isIcon
						isRounded
					>
						{isEditMode ? <MdOutlineClose /> : <MdEdit />}
					</Button>
				)}
			</div>
		</div>
	);
};
