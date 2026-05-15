import { Option } from '@/types';

export interface SelectProps {
	options: Option[];
	onChange?: (option: Option | null) => void;
	label?: string;
	placeholder?: string;
	error?: string;
	isSearchable?: boolean;
	isClearable?: boolean;
	fullWidth?: boolean;
}
