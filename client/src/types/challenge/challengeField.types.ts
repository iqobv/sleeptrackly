import { Field } from '../ui/field.types';
import { Option } from '../ui/option.types';

export interface ChallengeField<T> extends Field<T> {
	componentType?: 'input' | 'textarea' | 'list';
	options?: Option[];
}
