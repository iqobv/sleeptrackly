export interface ListProps<T> {
	items: T[];
	renderItem: (item: T, index: number) => React.ReactNode;
	listComponent?: React.ElementType;
	gap?: number;
	isHorizontal?: boolean;
	style?: React.CSSProperties;
	className?: string;
}
