'use client';

import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { usePrimitiveArrayField } from '@/hooks/usePrimitiveArrayField.hook';
import { Button, Field, Input } from '@shared/ui';
import { useFormContext } from 'react-hook-form';
import styles from './ChallengeTemplateForm.module.scss';
import { ChallengeTemplateGenerationMetadata } from './ChallengeTemplateGenerationMetadata/ChallengeTemplateGenerationMetadata';
import { DeleteButton } from './DeleteButton';

export const ChallengeTemplateGenerationForm = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateChallengeTemplateDto>();

	const { items, append, remove } = usePrimitiveArrayField<
		number,
		CreateChallengeTemplateDto
	>({
		defaultValue: 1,
		name: 'generationRules.durations',
		minLength: 1,
	});

	return (
		<div className={styles.generationForm}>
			<fieldset className={styles.fieldset}>
				<legend>Durations</legend>
				<div className={styles.list}>
					{items.map((_, index) => (
						<div key={`duration-${index}`} className={styles.item}>
							<Field
								className={styles.field}
								error={errors.generationRules?.durations?.[index]?.message}
							>
								<Input
									placeholder="Duration (days)"
									type="number"
									{...register(`generationRules.durations.${index}`, {
										valueAsNumber: true,
									})}
									error={!!errors.generationRules?.durations?.[index]}
								/>
							</Field>
							<DeleteButton
								length={items.length}
								onClick={() => remove(index)}
							/>
						</div>
					))}
				</div>
				<Button onClick={append} type="button">
					Add New Duration
				</Button>
			</fieldset>
			<ChallengeTemplateGenerationMetadata />
		</div>
	);
};
