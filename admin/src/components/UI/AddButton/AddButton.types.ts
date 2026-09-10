import { ComponentPropsWithRef } from 'react';
import { IconType } from 'react-icons';

export interface CreateButtonProps extends ComponentPropsWithRef<'a'> {
	children: React.ReactNode;
	href: string;
	customIcon?: IconType;
}
