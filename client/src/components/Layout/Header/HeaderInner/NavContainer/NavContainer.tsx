'use client';

import { TBreakpoint } from '@/types';
import MenuButton from '../MenuButton/MenuButton';
import styles from './NavContainer.module.scss';
import NavMenu from './NavMenu/NavMenu';
import { useNavContainer } from './useNavContainer.hook';

interface NavContainerProps {
	children: React.ReactNode;
	withMenu?: boolean;
	menuButtonClassName?: string;
	className?: string;
	mobileWidth?: TBreakpoint;
}

const NavContainer = ({
	children,
	withMenu = true,
	menuButtonClassName,
	className,
	mobileWidth = 'md',
}: NavContainerProps) => {
	const {
		isOpenForBtn,
		isClosing,
		show,
		isOpen,
		handleClick,
		handleCloseOnOverlay,
	} = useNavContainer(mobileWidth);

	return (
		<>
			{withMenu && (
				<MenuButton
					onClick={handleClick}
					isOpen={isOpenForBtn}
					isClosing={isClosing}
					className={menuButtonClassName}
				/>
			)}
			<div className={`${styles['nav-container']} ${className || ''}`}>
				{children}
			</div>
			{withMenu && show && (
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

export default NavContainer;
