'use client';

import { Button } from '@shared/ui';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { NavMenuLinksProps } from '../navMenuLinks';
import styles from './NavMenuLink.module.scss';

interface NavMenuLinkProps {
	link: NavMenuLinksProps;
	isOpen: boolean;
}

const NavMenuLink = ({ link, isOpen }: NavMenuLinkProps) => {
	const [isExpanded, setExpanded] = useState(false);

	const handleExpand = (e: React.MouseEvent) => {
		if (link.expanded && link.innerLinks) {
			e.stopPropagation();
			e.preventDefault();
			setExpanded((prev) => !prev);
		}
	};

	return (
		<div>
			<Button
				key={link.href}
				variant="text"
				className={`${styles.link} ${isOpen ? styles.open : ''}`}
				asChild
			>
				<Link
					href={link.href}
					className={styles.buttonContent}
					prefetch={false}
				>
					<div className={styles.content}>
						<link.Icon size={25} className={styles.icon} />
						<p className={styles.text}>{link.label}</p>
					</div>
					{isOpen && link.expanded && (
						<div className={`${styles.expand}`} onClick={handleExpand}>
							<MdOutlineArrowDropDown
								className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}
								size={30}
							/>
						</div>
					)}
				</Link>
			</Button>

			{isOpen &&
				isExpanded &&
				link.innerLinks &&
				link.innerLinks.length > 0 && (
					<div className={`${styles.innerLinks}`}>
						{link.innerLinks.map((innerLink) => (
							<Button
								key={innerLink.href}
								variant="text"
								className={`${styles.link} ${isOpen ? styles.open : ''}`}
								asChild
							>
								<Link
									href={innerLink.href}
									className={styles.buttonContent}
									prefetch={false}
								>
									<innerLink.Icon size={25} className={styles.icon} />
									<p className={styles.text}>{innerLink.label}</p>
								</Link>
							</Button>
						))}
					</div>
				)}
		</div>
	);
};

export default NavMenuLink;
