export interface ToggleSwitchProps {
	checked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	label?: string;
	id?: string;
	ref?: React.Ref<HTMLInputElement>;
}

export type ToggleSwitchTypes = ToggleSwitchProps &
	Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> &
	React.RefAttributes<HTMLInputElement>;
