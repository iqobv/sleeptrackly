import styles from './List.module.scss';

interface ListProps {
	children?: React.ReactNode;
	as?: 'ul' | 'ol';
}

export const List = ({ children, as = 'ol' }: ListProps) => {
	const Component = as;

	return <Component className={styles.list}>{children}</Component>;
};
