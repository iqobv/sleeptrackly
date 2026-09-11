'use client';

import clsx from 'clsx';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { NavMenuLinksProps } from '../navMenuLinks';
import styles from './NavMenuLink.module.scss';

interface ButtonContentProps {
	link: NavMenuLinksProps;
	isOpen: boolean;
	isExpanded: boolean;
}

export const ButtonContent = ({
	isExpanded,
	isOpen,
	link,
}: ButtonContentProps) => {
	return (
		<>
			<div className={styles.content}>
				<link.Icon size={25} className={styles.icon} />
				<p className={styles.text}>{link.label}</p>
			</div>
			{isOpen && link.expanded && (
				<div className={styles.expand}>
					<MdOutlineArrowDropDown
						className={clsx(styles.expandIcon, isExpanded && styles.expanded)}
						size={30}
					/>
				</div>
			)}
		</>
	);
};
