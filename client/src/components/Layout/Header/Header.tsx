'use client';

import styles from './Header.module.scss';
import HeaderEmailConfirmation from './HeaderEmailConfirmation/HeaderEmailConfirmation';
import Nav from './Nav/Nav';

const Header = () => {
	return (
		<header className={styles['header']}>
			<div className={`container ${styles['header__container']}`}>
				<Nav />
			</div>
			<HeaderEmailConfirmation />
		</header>
	);
};

export default Header;
