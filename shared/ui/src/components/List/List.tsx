import clsx from 'clsx';
import styles from './List.module.scss';
import { ListProps } from './List.types';

export const List = <T,>({
	items,
	className = '',
	isHorizontal = false,
	gap = 10,
	style,
	listComponent = 'div',
	renderItem,
}: ListProps<T>) => {
	const Component = listComponent;

	const classNames = clsx(
		styles.list,
		isHorizontal && styles.horizontal,
		className,
	);

	return (
		<Component
			className={classNames}
			style={
				{
					'--gap': `${gap}px`,
					...style,
				} as React.CSSProperties
			}
		>
			{items.map(renderItem)}
		</Component>
	);
};
