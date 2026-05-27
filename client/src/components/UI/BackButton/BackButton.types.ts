import { ButtonProps } from '../Button';

export interface BackButtonProps {
	onBack?: () => void;
	buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
}
