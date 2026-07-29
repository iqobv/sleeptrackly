'use client';

import {
	CreateChallengeTemplateDto,
	SleepDurationMetadataDto,
} from '@/dto/challenge/challengeTemplate.dto';
import { usePrimitiveArrayField } from '@/hooks/usePrimitiveArrayField.hook';
import { Button, Field, Input } from '@shared/ui';
import { FieldErrors, useFormContext } from 'react-hook-form';
import styles from '../ChallengeTemplateForm.module.scss';
import { DeleteButton } from '../DeleteButton';

export const SleepDurationField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateChallengeTemplateDto>();

	const {
		items: times,
		append: addTime,
		remove: removeTime,
	} = usePrimitiveArrayField<number, CreateChallengeTemplateDto>({
		name: 'generationRules.metadata.minDurationMinutes',
		defaultValue: 60,
		minLength: 1,
	});

	const metadataErrors = (errors.generationRules as Record<string, unknown>)
		?.metadata as FieldErrors<SleepDurationMetadataDto> | undefined;

	return (
		<fieldset className={styles.fieldset}>
			<legend>Min Duration</legend>
			<div className={styles.list}>
				{times.map((_, index) => (
					<div key={`time-${index}`} className={styles.item}>
						<Field
							error={metadataErrors?.minDurationMinutes?.[index]?.message}
							className={styles.field}
						>
							<Input
								type="number"
								{...register(
									`generationRules.metadata.minDurationMinutes.${index}`,
									{
										valueAsNumber: true,
									},
								)}
								placeholder="Min duration (minutes)"
								error={!!metadataErrors?.minDurationMinutes?.[index]}
							/>
						</Field>

						<DeleteButton
							length={times.length}
							onClick={() => removeTime(index)}
						/>
					</div>
				))}
			</div>
			<Button type="button" onClick={addTime}>
				Add Min Duration
			</Button>
		</fieldset>
	);
};
