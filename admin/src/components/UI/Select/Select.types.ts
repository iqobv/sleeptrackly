import { IOption } from '@/types';

export interface SelectProps {
	options: IOption[];
	value?: IOption | null;
	onChange?: (option: IOption | null) => void;
	label?: string;
	placeholder?: string;
	error?: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	fullWidth?: boolean;
}
