'use client';

import { Button, Field, Input } from '@/components/UI';
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
		<div className={styles.translations}>
			{fields.map((field, index) => {
				const error = translationsErrors?.[index];

				return (
					<div key={field.id} className={styles.item}>
						<div className={styles.fields}>
							<Field
								error={error?.language?.message}
								label='Language Code (e.g. "en", "fr")'
								required
							>
								<Input
									placeholder="Language"
									{...register(`translations.${index}.language` as Path<T>)}
								/>
							</Field>
							<Field label="Name" error={error?.name?.message} required>
								<Input
									placeholder="Name"
									{...register(`translations.${index}.name` as Path<T>)}
								/>
							</Field>
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

export default TranslationForm;
