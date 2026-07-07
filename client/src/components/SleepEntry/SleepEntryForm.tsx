'use client';

import { CreateSleepEntryFormDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { Form, FormActions, FormReset, FormSubmit } from '@shared/form';
import { FieldValues } from 'react-hook-form';
import { SleepEntryFormProps } from './SleepEntryForm.types';
import { SleepEntryFormBody } from './SleepEntryFormBody';

export const SleepEntryForm = <
	TIn extends FieldValues = CreateSleepEntryFormDto,
>({
	isOnlyForm = false,
	isCreate = false,
	customSubmit,
	formBodyWrapper = 'div',
	submitButtonText = 'Submit',
	resetButtonText = 'Reset',
	date,
	...props
}: SleepEntryFormProps<TIn>) => {
	return (
		<Form<TIn> {...props}>
			<SleepEntryFormBody<TIn>
				isOnlyForm={isOnlyForm}
				as={formBodyWrapper}
				isCreate={isCreate}
				date={date}
			/>
			{customSubmit ? (
				<>{customSubmit}</>
			) : (
				<FormActions>
					<FormSubmit>{submitButtonText}</FormSubmit>
					<FormReset>{resetButtonText}</FormReset>
				</FormActions>
			)}
		</Form>
	);
};
