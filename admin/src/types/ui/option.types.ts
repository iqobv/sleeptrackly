export interface IOption<T = string> {
	value: T;
	label: string;
	isDisabled?: boolean;
	isDefault?: boolean;
}
