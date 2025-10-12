import { IField } from '../ui/field.types';
import { IOption } from '../ui/option.types';

export interface ChallengeField<T> extends IField<T> {
	componentType?: 'input' | 'textarea' | 'list';
	options?: IOption[];
}
