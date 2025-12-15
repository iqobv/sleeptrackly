import styles from './List.module.scss';
import { ListProps } from './List.types';

export default function List<T>({
	items,
	className = '',
	isHorizontal = false,
	gap = 10,
	style,
	listComponent = 'div',
	renderItem,
}: ListProps<T>) {
	const Component = listComponent;

	const classNames = [
		styles['list'],
		isHorizontal ? styles['list--horizontal'] : '',
		className,
	];

	return (
		<Component
			className={classNames.join(' ').trim()}
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
}
