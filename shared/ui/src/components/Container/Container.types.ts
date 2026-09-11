import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type ContainerProps<T extends ElementType> = {
	as?: T;
	children?: ReactNode;
	className?: string;
} & ComponentPropsWithoutRef<T>;
