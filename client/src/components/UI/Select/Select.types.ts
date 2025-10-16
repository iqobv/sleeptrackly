import { IOption } from '@/types';

export interface SelectProps {
	options: IOption[];
	onChange?: (option: IOption | null) => void;
	label?: string;
	placeholder?: string;
	error?: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	fullWidth?: boolean;
}
