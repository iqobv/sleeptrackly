'use client';

import { useNavMenuStore } from '@/store/navMenu.store';
import { useEffect, useState } from 'react';
import slyles from './NavMenu.module.scss';
import { NavMenuLink } from './NavMenuLink/NavMenuLink';
import { NAV_MENU_LINKS } from './navMenuLinks';

export const NavMenu = () => {
	const [isMounted, setMounted] = useState(false);
	const isExpended = useNavMenuStore((state) => state.isExpanded);

	useEffect(() => setMounted(true), []);

	return (
		<div
			className={`${slyles.nav} ${isExpended && isMounted ? slyles.open : ''}`}
		>
			<div className={slyles.links}>
				{NAV_MENU_LINKS.map((link) => (
					<NavMenuLink
						key={link.href}
						link={link}
						isOpen={isExpended && isMounted}
					/>
				))}
			</div>
		</div>
	);
};
