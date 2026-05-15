export interface Option<T = string> {
	value: T;
	label: string;
	isDisabled?: boolean;
	isDefault?: boolean;
}
