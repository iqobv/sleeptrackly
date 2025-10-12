'use client';

import NavLinks from '../../NavLinks/NavLinks';
import styles from './NavMenu.module.scss';

interface NavMenuProps {
	isOpen: boolean;
	isClosing: boolean;
	handleClick: () => void;
	handleCloseOnOverlay: (e: React.MouseEvent) => void;
}

const NavMenu = ({
	isOpen,
	isClosing,
	handleClick,
	handleCloseOnOverlay,
}: NavMenuProps) => {
	return (
		<div
			className={`${styles['nav-overlay']} ${isOpen ? styles['open'] : ''} ${
				isClosing ? styles['closing'] : ''
			}`}
			onClick={handleCloseOnOverlay}
			tabIndex={isOpen ? 0 : -1}
		>
			<div className={styles['nav-overlay-content']}>
				<nav className={styles.nav}>
					<NavLinks closeMenu={handleClick} />
				</nav>
			</div>
		</div>
	);
};

export default NavMenu;
