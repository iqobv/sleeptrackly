export interface FieldProps {
	children: React.ReactNode;
	label?: React.ReactNode;
	id?: string;
	error?: string;
	required?: boolean;
	className?: string;
	disabled?: boolean;
	style?: React.CSSProperties;
	hidden?: boolean;
}

export interface FieldContextValue {
	id?: string;
	error?: boolean;
	required?: boolean;
	disabled?: boolean;
	hidden?: boolean;
}
