import styles from './Header.module.scss';

interface HeaderProps {
	children: React.ReactNode;
	headerClassName?: string;
	containerClassName?: string;
}

export const Header = ({
	children,
	headerClassName,
	containerClassName,
}: HeaderProps) => {
	return (
		<header className={`${styles.header} ${headerClassName || ''}`}>
			<div className={`${styles.container} ${containerClassName || ''}`}>
				{children}
			</div>
		</header>
	);
};
