'use client';

import { Button } from '@/components/UI';
import { useState } from 'react';
import { NavMenuLinksProps } from '../navMenuLinks';
import styles from './NavMenuLink.module.scss';

interface NavMenuLinkProps {
	link: NavMenuLinksProps;
	isOpen: boolean;
}

const NavMenuLink = ({ link, isOpen }: NavMenuLinkProps) => {
	const [isExpanded, setExpanded] = useState(false);

	const handleExpand = () => {
		if (link.expanded && link.innerLinks) {
			setExpanded((prev) => !prev);
		}
	};

	return (
		<div>
			<Button
				key={link.href}
				href={link.href}
				variant="text"
				className={`${styles['menu-link']} ${isOpen ? styles['menu-link--open'] : ''}`}
				contentClassName={styles['menu-link__button-content']}
			>
				<div className={styles['menu-link__content']}>
					<link.Icon size={25} className={styles['menu-link__icon']} />
					<p className={styles['menu-link__text']}>{link.label}</p>
				</div>
				{isOpen && link.expanded && (
					<div className={styles['menu-link__expand']} onClick={handleExpand}>
						▼
					</div>
				)}
			</Button>

			{isOpen &&
				isExpanded &&
				link.innerLinks &&
				link.innerLinks.length > 0 && (
					<div className={`${styles['menu-link__inner-links']}`}>
						{link.innerLinks.map((innerLink) => (
							<Button
								key={innerLink.href}
								href={innerLink.href}
								variant="text"
								className={`${styles['menu-link']} ${isOpen ? styles['menu-link--open'] : ''}`}
							>
								<innerLink.Icon
									size={25}
									className={styles['menu-link__icon']}
								/>
								<p className={styles['menu-link__text']}>{innerLink.label}</p>
							</Button>
						))}
					</div>
				)}
		</div>
	);
};

export default NavMenuLink;
