import styles from './TableCell.module.scss';

interface TableCellProps {
	as: 'td' | 'th';
	children: React.ReactNode;
}

export const TableCell = ({ as, children }: TableCellProps) => {
	const Component = as;

	return <Component className={styles.cell}>{children}</Component>;
};
