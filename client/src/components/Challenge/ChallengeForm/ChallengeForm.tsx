'use client';

import { ChallengeField } from '@/types';
import {
	FormActions,
	FormField,
	FormReset,
	FormSelect,
	FormSubmit,
} from '@shared/form';
import { Input, SelectItem, Textarea, Typography } from '@shared/ui';
import { FieldValues, useFormContext } from 'react-hook-form';

interface ChallengeFormProps<T extends FieldValues> {
	fields: ChallengeField<T>[];
	buttonLabel?: string;
	isLoading?: boolean;
	isEditing?: boolean;
}

export const ChallengeForm = <T extends FieldValues>({
	fields,
	buttonLabel = 'Submit',
	isLoading = false,
	isEditing = false,
}: ChallengeFormProps<T>) => {
	const {
		formState: { errors },
	} = useFormContext<T>();

	return (
		<>
			{errors.root && (
				<Typography color="error">{errors.root.message}</Typography>
			)}
			{fields.map(({ componentType, ...f }) => {
				const error = errors[f.name]?.message as string | undefined;

				const renderComponent = () => {
					switch (componentType) {
						case 'list':
							if (!f.options) return <></>;

							return (
								<FormSelect
									name={f.name}
									placeholder={f.placeholder}
									id={f.name}
								>
									{f.options.map((opt) => (
										<SelectItem value={opt.value} key={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</FormSelect>
							);
						case 'textarea':
							return (
								<Textarea
									autoComplete={f.autoComplete}
									placeholder={f.placeholder}
									minRows={1}
									maxRows={4}
									id={f.name}
								/>
							);
						default:
							return (
								<Input
									type={f.type}
									autoComplete={f.autoComplete}
									placeholder={f.placeholder}
									id={f.name}
								/>
							);
					}
				};

				return (
					<FormField
						name={f.name}
						key={f.name}
						label={f.label}
						error={error}
						required={f.required}
						id={f.name}
					>
						{renderComponent()}
					</FormField>
				);
			})}
			<FormActions>
				{isEditing && <FormReset disabledOnEmpty>Reset</FormReset>}
				<FormSubmit disabledOnEmpty buttonProps={{ loading: isLoading }}>
					{buttonLabel}
				</FormSubmit>
			</FormActions>
		</>
	);
};
