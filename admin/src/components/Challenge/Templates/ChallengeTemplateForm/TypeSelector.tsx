'use client';

import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@shared/ui';
import { Controller, useFormContext } from 'react-hook-form';

interface TypeSelectorProps {
	isEditing?: boolean;
}

export const TypeSelector = ({ isEditing }: TypeSelectorProps) => {
	const { control, setValue } = useFormContext<CreateChallengeTemplateDto>();

	const handleTypeChange = (
		newType: ChallengeType,
		onChange: (val: ChallengeType) => void,
	) => {
		if (isEditing) return;

		onChange(newType);

		let defaultMetadata = {};

		switch (newType) {
			case ChallengeType.SLEEP_DURATION:
				defaultMetadata = { minDurationMinutes: [60] };
				break;
			case ChallengeType.BEDTIME_VARIANCE:
				defaultMetadata = { maxVarianceMinutes: [60] };
				break;
			case ChallengeType.BEDTIME_CONSISTENCY:
				defaultMetadata = { marginMinutes: [60], targetTime: ['00:00'] };
				break;
			case ChallengeType.WAKE_TIME_CONSISTENCY:
				defaultMetadata = { marginMinutes: [60], targetTime: ['00:00'] };
				break;
		}

		setValue('generationRules.metadata', defaultMetadata as never, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	return (
		<Controller
			control={control}
			name="type"
			render={({ field }) => (
				<Select
					value={field.value}
					onValueChange={(val) =>
						handleTypeChange(val as ChallengeType, field.onChange)
					}
					disabled={isEditing}
				>
					<SelectTrigger placeholder="Select Challenge Type" />
					<SelectContent>
						{Object.entries(ChallengeType).map(([key, value]) => (
							<SelectItem key={key} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		/>
	);
};
