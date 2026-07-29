'use client';

import {
	CreateChallengeTemplateDto,
	TimeConsistencyMetadataDto,
} from '@/dto/challenge/challengeTemplate.dto';
import { usePrimitiveArrayField } from '@/hooks/usePrimitiveArrayField.hook';
import { Button, Field, Input } from '@shared/ui';
import { FieldErrors, useFormContext } from 'react-hook-form';
import styles from '../ChallengeTemplateForm.module.scss';
import { DeleteButton } from '../DeleteButton';

export const TimeConsistencyFields = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateChallengeTemplateDto>();

	const {
		items: margins,
		append: addMargin,
		remove: removeMargin,
	} = usePrimitiveArrayField<number, CreateChallengeTemplateDto>({
		name: 'generationRules.metadata.marginMinutes',
		defaultValue: 1,
	});

	const {
		items: targetTimes,
		append: addTargetTime,
		remove: removeTargetTime,
	} = usePrimitiveArrayField<string, CreateChallengeTemplateDto>({
		name: 'generationRules.metadata.targetTime',
		defaultValue: '00:00',
	});

	const metadataErrors = (errors.generationRules as Record<string, unknown>)
		?.metadata as FieldErrors<TimeConsistencyMetadataDto> | undefined;

	return (
		<>
			<fieldset className={styles.fieldset}>
				<legend>Margin Minutes</legend>
				<div className={styles.list}>
					{margins.map((_, index) => (
						<div key={`margin-${index}`} className={styles.item}>
							<Field
								className={styles.field}
								error={metadataErrors?.marginMinutes?.[index]?.message}
							>
								<Input
									type="number"
									{...register(
										`generationRules.metadata.marginMinutes.${index}`,
										{
											valueAsNumber: true,
										},
									)}
									placeholder="Margin (minutes)"
									error={!!metadataErrors?.marginMinutes?.[index]}
								/>
							</Field>
							<DeleteButton
								length={margins.length}
								onClick={() => removeMargin(index)}
							/>
						</div>
					))}
				</div>
				<Button type="button" onClick={addMargin}>
					Add Margin
				</Button>
			</fieldset>
			<fieldset className={styles.fieldset}>
				<legend>Target Times</legend>
				<div className={styles.list}>
					{targetTimes.map((_, index) => (
						<div key={`target-${index}`} className={styles.item}>
							<Field
								className={styles.field}
								error={metadataErrors?.targetTime?.[index]?.message}
							>
								<Input
									type="text"
									{...register(`generationRules.metadata.targetTime.${index}`)}
									placeholder="HH:mm"
									error={!!metadataErrors?.targetTime?.[index]}
								/>
							</Field>
							<DeleteButton
								length={targetTimes.length}
								onClick={() => removeTargetTime(index)}
							/>
						</div>
					))}
				</div>
				<Button type="button" onClick={addTargetTime}>
					Add Target Time
				</Button>
			</fieldset>
		</>
	);
};
