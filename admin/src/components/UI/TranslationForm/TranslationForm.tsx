'use client';

import { FormField } from '@shared/form';
import { Button, Input } from '@shared/ui';
import { FieldValues, useFieldArray, useFormContext } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import styles from './TranslationForm.module.scss';
import {
	DefaultWithTranslationDto,
	TranslationFormProps,
} from './TranslationForm.types';

export const TranslationForm = <
	D extends FieldValues = DefaultWithTranslationDto,
>({
	fields,
	name,
	defaultValues,
}: TranslationFormProps<D>) => {
	const { control } = useFormContext<D>();

	const {
		fields: translationFields,
		append,
		remove,
	} = useFieldArray<D>({
		control,
		name,
	});

	return (
		<div className={styles.translations}>
			{translationFields.map((translationField, index) => (
				<div key={`translation-${translationField.id}`} className={styles.item}>
					<div className={styles.fields}>
						{fields(index).map((field) => (
							<FormField name={field.name} key={field.name} label={field.label}>
								<Input placeholder={field.placeholder} />
							</FormField>
						))}
					</div>
					<Button
						variant="text"
						color="danger"
						isIcon
						isRounded
						type="button"
						onClick={() => remove(index)}
						disabled={translationFields.length <= 1}
					>
						<MdDelete size={24} />
					</Button>
				</div>
			))}
			<Button onClick={() => append(defaultValues)}>Add Translation</Button>
		</div>
	);
};
