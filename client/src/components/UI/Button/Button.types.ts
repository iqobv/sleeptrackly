export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'link';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
	children: React.ReactNode;
	variant?: ButtonVariant;
	onClick?: (
		event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => void;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	style?: React.CSSProperties;
	id?: string;
	size?: ButtonSize;
	fullWidth?: boolean;
	isIcon?: boolean;
}

interface AnchorButtonProps
	extends Omit<
			React.AnchorHTMLAttributes<HTMLAnchorElement>,
			keyof ButtonBaseProps
		>,
		ButtonBaseProps {
	href: string;
	type?: never;
}

interface NativeButtonProps
	extends Omit<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			keyof ButtonBaseProps
		>,
		ButtonBaseProps {
	href?: undefined;
	type?: ButtonType;
}

export type ButtonProps = AnchorButtonProps | NativeButtonProps;
