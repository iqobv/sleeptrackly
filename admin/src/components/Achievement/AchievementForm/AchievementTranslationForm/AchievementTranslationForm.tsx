'use client';

import { AchievementTranslationDto } from '@/dto/achievement/achievement.dto';
import { Button, Field, Input } from '@shared/ui';
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
import styles from './AchievementTranslationForm.module.scss';

interface HasTranslations extends FieldValues {
	translations: AchievementTranslationDto[];
}

export const AchievementTranslationForm = <D extends HasTranslations>() => {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<D>();

	const { fields, append, remove } = useFieldArray<D>({
		control,
		name: 'translations' as ArrayPath<D>,
	});

	const translationsErrors = errors.translations as
		FieldErrors<AchievementTranslationDto[]> | undefined;

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
									{...register(`translations.${index}.language` as Path<D>)}
								/>
							</Field>
							<Field label="Title" error={error?.title?.message} required>
								<Input
									placeholder="Name"
									{...register(`translations.${index}.title` as Path<D>)}
								/>
							</Field>
							<Field
								label="Description"
								error={error?.description?.message}
								required
							>
								<Input
									placeholder="Name"
									{...register(`translations.${index}.description` as Path<D>)}
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
					} as FieldArray<D, ArrayPath<D>>)
				}
			>
				Add Translation
			</Button>
		</div>
	);
};
