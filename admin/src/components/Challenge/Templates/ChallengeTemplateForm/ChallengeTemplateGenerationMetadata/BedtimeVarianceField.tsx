'use client';

import {
	BedtimeVarianceMetadataDto,
	CreateChallengeTemplateDto,
} from '@/dto/challenge/challengeTemplate.dto';
import { usePrimitiveArrayField } from '@/hooks/usePrimitiveArrayField.hook';
import { Button, Field, Input } from '@shared/ui';
import { FieldErrors, useFormContext } from 'react-hook-form';
import styles from '../ChallengeTemplateForm.module.scss';
import { DeleteButton } from '../DeleteButton';

export const BedtimeVarianceField = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateChallengeTemplateDto>();

	const {
		items: variances,
		append: addVariance,
		remove: removeVariance,
	} = usePrimitiveArrayField<number, CreateChallengeTemplateDto>({
		name: 'generationRules.metadata.maxVarianceMinutes',
		defaultValue: 60,
	});

	const metadataErrors = (errors.generationRules as Record<string, unknown>)
		?.metadata as FieldErrors<BedtimeVarianceMetadataDto> | undefined;

	return (
		<fieldset className={styles.fieldset}>
			<legend>Max Variance Minutes</legend>
			<div className={styles.list}>
				{variances.map((_, index) => (
					<div key={`variance-${index}`} className={styles.item}>
						<Field
							className={styles.field}
							error={metadataErrors?.maxVarianceMinutes?.[index]?.message}
						>
							<Input
								type="number"
								{...register(
									`generationRules.metadata.maxVarianceMinutes.${index}`,
									{
										valueAsNumber: true,
									},
								)}
								placeholder="Variance (minutes)"
								error={!!metadataErrors?.maxVarianceMinutes?.[index]}
							/>
						</Field>
						<DeleteButton
							length={variances.length}
							onClick={() => removeVariance(index)}
						/>
					</div>
				))}
			</div>
			<Button type="button" onClick={addVariance}>
				Add Variance
			</Button>
		</fieldset>
	);
};
