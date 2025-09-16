import { IOption } from '@/types';

export interface SelectProps {
	placeholder?: string;
	options: IOption[];
	onChange?: (option: IOption | null) => void;
	label?: string;
	error?: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	fullWidth?: boolean;
}
