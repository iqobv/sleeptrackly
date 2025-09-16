'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher';
import AuthButtons from '../AuthButtons/AuthButtons';
import MenuButton from '../MenuButton/MenuButton';
import NavLinks from '../NavLinks/NavLinks';
import styles from './Nav.module.scss';

const Nav = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isOpenForBtn, setIsOpenForBtn] = useState(false);

	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const show = mounted && isMobile;

	const handleClick = () => {
		isOpen ? setIsClosing(true) : setIsOpen(true);
		setIsOpenForBtn(!isOpenForBtn);
	};

	useEffect(() => {
		if (isClosing) {
			const timeout = setTimeout(() => {
				setIsOpen(false);
				setIsClosing(false);
			}, 300);
			return () => clearTimeout(timeout);
		}
	}, [isClosing]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset';
	}, [isOpen]);

	const handleCloseOnOverlay = (e: React.MouseEvent) => {
		e.target === e.currentTarget && handleClick();
	};

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
					<ThemeSwitcher />
					<div className={styles['auth-container']}>
						<AuthButtons />
					</div>
				</div>
			</div>
			{show && (
				<div
					className={`${styles['nav-overlay']} ${
						isOpen ? styles['open'] : ''
					} ${isClosing ? styles['closing'] : ''}`}
					onClick={handleCloseOnOverlay}
					tabIndex={isOpen ? 0 : -1}
				>
					<div className={styles['nav-overlay-content']}>
						<nav className={styles.nav}>
							<NavLinks closeMenu={handleClick} />
						</nav>
						<AuthButtons closeMenu={handleClick} />
					</div>
				</div>
			)}
		</>
	);
};

export default Nav;
