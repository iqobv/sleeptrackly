import { CreateSleepEntryFormDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { FormProps } from '@shared/form';
import React from 'react';
import { FieldValues } from 'react-hook-form';

export interface SleepEntryFormProps<
	TIn extends FieldValues = CreateSleepEntryFormDto,
> extends Omit<FormProps<TIn>, 'children'> {
	isOnlyForm?: boolean;
	isCreate?: boolean;
	customSubmit?: React.ReactNode;
	formBodyWrapper?: React.ElementType;
	submitButtonText?: string;
	resetButtonText?: string;
	date?: Date;
}
