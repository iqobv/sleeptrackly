export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	children: React.ReactNode;
	variant?: ButtonVariant;
	color?: ButtonColor;
	asChild?: boolean;
	loading?: boolean;
	size?: ButtonSize;
	fullWidth?: boolean;
	isIcon?: boolean;
	isRounded?: boolean;
	onClick?: React.MouseEventHandler<HTMLElement>;
}
