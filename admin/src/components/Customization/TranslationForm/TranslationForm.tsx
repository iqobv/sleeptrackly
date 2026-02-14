'use client';

import { Button, TextField } from '@/components/UI';
import { TranslationDto } from '@/dto';
import {
	ArrayPath,
	FieldArray,
	FieldErrors,
	FieldValues,
	Path,
	useFieldArray,
	useFormContext,
} from 'react-hook-form';
import { MdOutlineDelete } from 'react-icons/md';
import styles from './TranslationForm.module.scss';

interface HasTranslations extends FieldValues {
	translations: TranslationDto[];
}

const TranslationForm = <T extends HasTranslations>() => {
	const {
		control,
		register,
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
		<div className={styles['translations']}>
			{fields.map((field, index) => {
				const error = translationsErrors?.[index];

				return (
					<div key={field.id} className={styles['translations__item']}>
						<div className={styles['translations__fields']}>
							<TextField
								placeholder="Language"
								error={error?.language?.message}
								fullWidth
								label='Language Code (e.g. "en", "fr")'
								{...register(`translations.${index}.language` as Path<T>)}
							/>
							<TextField
								placeholder="Name"
								label="Name"
								fullWidth
								error={error?.name?.message}
								{...register(`translations.${index}.name` as Path<T>)}
							/>
						</div>
						<Button
							type="button"
							variant="danger"
							isIcon
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
				variant="secondary"
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

export default TranslationForm;
