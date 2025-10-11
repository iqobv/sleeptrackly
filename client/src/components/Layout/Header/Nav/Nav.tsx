'use client';

import AuthButtons from '../AuthButtons/AuthButtons';
import MenuButton from '../MenuButton/MenuButton';
import NavLinks from '../NavLinks/NavLinks';
import styles from './Nav.module.scss';
import NavMenu from './NavMenu/NavMenu';
import { useNav } from './useNav';

const Nav = () => {
	const {
		isOpenForBtn,
		isClosing,
		show,
		isOpen,
		handleClick,
		handleCloseOnOverlay,
	} = useNav();

	return (
		<>
			<MenuButton
				onClick={handleClick}
				isOpen={isOpenForBtn}
				isClosing={isClosing}
			/>
			<div className={styles['nav-container']}>
				<nav className={styles.nav}>
					<NavLinks />
				</nav>
				<div className={styles['theme-auth-container']}>
					<div className={styles['auth-container']}>
						<AuthButtons />
					</div>
				</div>
			</div>
			{show && (
				<NavMenu
					isOpen={isOpen}
					isClosing={isClosing}
					handleClick={handleClick}
					handleCloseOnOverlay={handleCloseOnOverlay}
				/>
			)}
		</>
	);
};

export default Nav;
