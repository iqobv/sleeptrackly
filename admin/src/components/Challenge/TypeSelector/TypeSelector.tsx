'use client';

import { ChallengeType } from '@/types/challenge/challengeType.types';
import {
	Field,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@shared/ui';
import {
	Controller,
	FieldValues,
	Path,
	PathValue,
	useFormContext,
} from 'react-hook-form';

interface TypeSelectorProps<
	D extends FieldValues,
	TMetadataMap extends Record<ChallengeType, unknown>,
> {
	isEditing?: boolean;
	metadataName: Path<D>;
	selectName: Path<D>;
	defaultMetadataMap: TMetadataMap;
}

export const TypeSelector = <
	D extends FieldValues,
	TMetadataMap extends Record<ChallengeType, unknown>,
>({
	isEditing,
	metadataName,
	selectName,
	defaultMetadataMap,
}: TypeSelectorProps<D, TMetadataMap>) => {
	const { control, setValue } = useFormContext<D>();

	const handleTypeChange = (
		newType: ChallengeType,
		onChange: (val: ChallengeType) => void,
	) => {
		if (isEditing) return;

		onChange(newType);

		const defaultMetadata = defaultMetadataMap[newType];

		setValue(metadataName, defaultMetadata as PathValue<D, Path<D>>, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	return (
		<Controller
			control={control}
			name={selectName}
			render={({ field, formState: { errors } }) => (
				<Field
					error={errors[selectName]?.message as string | undefined}
					label="Challenge Type"
					id="type"
					required={!isEditing}
				>
					<Select
						value={field.value}
						onValueChange={(val) =>
							handleTypeChange(val as ChallengeType, field.onChange)
						}
						disabled={isEditing}
					>
						<SelectTrigger id="type" placeholder="Select Challenge Type" />
						<SelectContent>
							{Object.entries(ChallengeType).map(([key, value]) => (
								<SelectItem key={key} value={value}>
									{value}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			)}
		/>
	);
};
