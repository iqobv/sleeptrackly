import clsx from 'clsx';
import { ElementType } from 'react';
import styles from './Container.module.scss';
import { ContainerProps } from './Container.types';

export const Container = <T extends ElementType = 'div'>({
	as,
	children,
	className,
	...props
}: ContainerProps<T>) => {
	const Component = as || 'div';

	return (
		<Component className={clsx(styles.container, className)} {...props}>
			{children}
		</Component>
	);
};
