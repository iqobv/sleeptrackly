import { Field } from './field.types';
import { IOption } from './option.types';

export interface ChallengeField<T> extends Field<T> {
	componentType?: 'input' | 'textarea' | 'list';
	options?: IOption[];
}
