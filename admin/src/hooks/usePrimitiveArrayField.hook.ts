'use client';

import { useCallback } from 'react';
import {
	FieldValues,
	Path,
	PathValue,
	useFormContext,
	useWatch,
} from 'react-hook-form';

interface UsePrimitiveArrayFieldProps<
	T extends string | number,
	TDto extends FieldValues,
> {
	name: Path<TDto>;
	defaultValue: T;
	minLength?: number;
}

export const usePrimitiveArrayField = <
	T extends string | number,
	TDto extends FieldValues,
>({
	name,
	defaultValue,
	minLength = 1,
}: UsePrimitiveArrayFieldProps<T, TDto>) => {
	const { control, getValues, setValue } = useFormContext<TDto>();

	const items =
		(useWatch({
			control,
			name,
		}) as T[] | undefined) || [];

	const append = useCallback(() => {
		const current = (getValues(name) as T[] | undefined) || [];
		setValue(name, [...current, defaultValue] as PathValue<TDto, Path<TDto>>, {
			shouldValidate: true,
			shouldDirty: true,
		});
	}, [getValues, setValue, name, defaultValue]);

	const remove = useCallback(
		(indexToRemove: number) => {
			const current = (getValues(name) as T[] | undefined) || [];

			if (current.length <= minLength) {
				return;
			}

			const newValues = current.filter((_, i) => i !== indexToRemove);
			setValue(name, newValues as PathValue<TDto, Path<TDto>>, {
				shouldValidate: true,
				shouldDirty: true,
			});
		},
		[getValues, setValue, name, minLength],
	);

	return { items, append, remove };
};
