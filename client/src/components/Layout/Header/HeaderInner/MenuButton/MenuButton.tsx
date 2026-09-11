'use client';

import styles from './MenuButton.module.scss';

interface MenuButtonProps {
	onClick: () => void;
	isOpen: boolean;
	isClosing: boolean;
	className?: string;
}

export const MenuButton = ({
	onClick,
	isOpen,
	isClosing,
	className,
}: MenuButtonProps) => {
	return (
		<button
			className={`${styles.menuButton} ${isOpen ? styles.open : ''} ${
				isClosing ? styles.closing : ''
			} ${className || ''}`.trim()}
			disabled={isClosing}
			onClick={onClick}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};
