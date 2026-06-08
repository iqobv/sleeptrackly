'use client';

import { FormField } from '@/components/UI';
import { TranslationDto } from '@/dto';
import { Button, Input } from '@shared/ui';
import {
	ArrayPath,
	FieldArray,
	FieldErrors,
	FieldValues,
	useFieldArray,
	useFormContext,
} from 'react-hook-form';
import { MdOutlineDelete } from 'react-icons/md';
import styles from './TranslationForm.module.scss';

interface HasTranslations extends FieldValues {
	translations: TranslationDto[];
}

export const TranslationForm = <T extends HasTranslations>() => {
	const {
		control,
		formState: { errors },
	} = useFormContext<T>();

	const { fields, append, remove } = useFieldArray<T>({
		control,
		name: 'translations' as ArrayPath<T>,
	});

	const translationsErrors = errors.translations as
		| FieldErrors<TranslationDto[]>
		| undefined;

	return (
		<div className={styles.translations}>
			{fields.map((field, index) => {
				const error = translationsErrors?.[index];

				return (
					<div key={field.id} className={styles.item}>
						<div className={styles.fields}>
							<FormField
								name={`translations.${index}.language`}
								error={error?.language?.message}
								label='Language Code (e.g. "en", "fr")'
								required
							>
								<Input placeholder="Language" />
							</FormField>
							<FormField
								name={`translations.${index}.name`}
								label="Name"
								error={error?.name?.message}
								required
							>
								<Input placeholder="Name" />
							</FormField>
						</div>
						<Button
							type="button"
							variant="text"
							color="danger"
							isIcon
							isRounded
							size="md"
							onClick={() => remove(index)}
						>
							<MdOutlineDelete size={20} />
						</Button>
					</div>
				);
			})}
			<Button
				type="button"
				variant="contained"
				color="secondary"
				onClick={() =>
					append({
						language: '',
						name: '',
					} as FieldArray<T, ArrayPath<T>>)
				}
			>
				Add Translation
			</Button>
		</div>
	);
};
