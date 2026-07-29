import { TranslationDto } from '@/dto/translation/translation.dto';
import { Field } from '@/types/ui/field.types';
import { ArrayPath, FieldArray, FieldValues } from 'react-hook-form';

export type DefaultWithTranslationDto = FieldValues & {
	translations: TranslationDto[];
};

export interface TranslationFormProps<D extends FieldValues> {
	name: ArrayPath<D>;
	fields: (index: number) => Field<D>[];
	defaultValues: FieldArray<D, ArrayPath<D>>[];
}
