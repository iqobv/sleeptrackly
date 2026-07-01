'use client';

import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { FormField } from '@shared/form';
import { Button, Input, Typography } from '@shared/ui';
import { useState } from 'react';
import { Path } from 'react-hook-form';
import { MdEdit, MdOutlineClose } from 'react-icons/md';
import styles from './TimerEndInfo.module.scss';

interface TimerEndInfoItemProps {
	label: React.ReactNode;
	value: Date;
	name: Path<UpdateSleepEntryDto>;
}

const formatDate = new Intl.DateTimeFormat(undefined, {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
});

export const TimerEndInfoItem = ({
	label,
	value,
	name,
}: TimerEndInfoItemProps) => {
	const [isEditMode, setIsEditMode] = useState(false);

	const handleClick = () => setIsEditMode((prev) => !prev);

	return (
		<div className={styles.item}>
			<Typography color="secondary">{label}</Typography>
			<div className={styles.itemContent}>
				{isEditMode ? (
					<FormField name={name}>
						<Input
							type="datetime-local"
							step="1"
							inputClassName={styles.input}
						/>
					</FormField>
				) : (
					<Typography>{formatDate.format(value)}</Typography>
				)}
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
			</div>
		</div>
	);
};
