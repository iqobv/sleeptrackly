'use client';

import { usePrimitiveArrayField } from '@/hooks/usePrimitiveArrayField.hook';
import { Button, Field, Input } from '@shared/ui';
import {
	FieldErrors,
	FieldValues,
	Path,
	useFormContext,
} from 'react-hook-form';
import { DeleteButton } from './DeleteButton';
import styles from './PrimitiveArrayField.module.scss';

const getFieldError = (errors: FieldErrors, path: string) => {
	const errorObj = path.split('.').reduce<unknown>((acc, part) => {
		return acc && typeof acc === 'object' && acc !== null
			? (acc as Record<string, unknown>)[part]
			: undefined;
	}, errors);

	return errorObj as Record<string, unknown> | undefined;
};

interface PrimitiveArrayFieldProps<
	T extends string | number,
	TDto extends FieldValues,
> {
	name: Path<TDto>;
	legend: string;
	addButtonLabel: string;
	defaultValue: T;
	type?: 'number' | 'text';
	placeholder?: string;
	minLength?: number;
}

export const PrimitiveArrayField = <
	T extends string | number,
	TDto extends FieldValues,
>({
	name,
	legend,
	addButtonLabel,
	defaultValue,
	type = 'text',
	placeholder,
	minLength = 1,
}: PrimitiveArrayFieldProps<T, TDto>) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<TDto>();

	const { items, append, remove } = usePrimitiveArrayField<T, TDto>({
		name,
		defaultValue,
		minLength,
	});

	const arrayErrorObj = getFieldError(errors, name);
	const arrayLevelErrorMessage = arrayErrorObj?.message as string | undefined;

	return (
		<fieldset className={styles.fieldset}>
			<legend>{legend}</legend>
			<div className={styles.list}>
				{items.map((_, index) => {
					const itemErrorMessage = (
						arrayErrorObj?.[index] as Record<string, unknown> | undefined
					)?.message as string | undefined;

					return (
						<div key={`${name}-${index}`} className={styles.item}>
							<Field className={styles.field} error={itemErrorMessage}>
								<Input
									type={type}
									{...register(`${name}.${index}` as Path<TDto>, {
										valueAsNumber: type === 'number',
									})}
									placeholder={placeholder}
									error={!!itemErrorMessage}
								/>
							</Field>
							<DeleteButton
								length={items.length}
								onClick={() => remove(index)}
							/>
						</div>
					);
				})}
			</div>

			{arrayLevelErrorMessage && (
				<span
					style={{
						color: 'var(--error-color, red)',
						fontSize: '12px',
						display: 'block',
						marginBottom: '8px',
					}}
				>
					{arrayLevelErrorMessage}
				</span>
			)}

			<Button type="button" onClick={append}>
				{addButtonLabel}
			</Button>
		</fieldset>
	);
};
