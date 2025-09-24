'use client';

import styles from './MenuButton.module.scss';

interface MenuButtonProps {
	onClick: () => void;
	isOpen: boolean;
	isClosing: boolean;
}

const MenuButton = ({ onClick, isOpen, isClosing }: MenuButtonProps) => {
	return (
		<button
			className={`${styles['menu-button']} ${isOpen ? styles.open : ''} ${
				isClosing ? styles.closing : ''
			}`}
			disabled={isClosing}
			onClick={onClick}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};

export default MenuButton;
