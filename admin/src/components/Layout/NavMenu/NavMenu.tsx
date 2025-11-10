'use client';

import { Button } from '@/components/UI';
import { useNavMenuStore } from '@/store';
import { useEffect, useState } from 'react';
import slyles from './NavMenu.module.scss';
import { NAV_MENU_LINKS } from './navMenuLinks';

const NavMenu = () => {
	const [isMounted, setMounted] = useState(false);
	const isExpended = useNavMenuStore((state) => state.isExpanded);

	useEffect(() => setMounted(true), []);

	return (
		<div
			className={`${slyles['nav-menu']} ${
				isExpended && isMounted ? slyles['open'] : ''
			}`}
		>
			<div className={slyles['nav-menu__links']}>
				{NAV_MENU_LINKS.map(({ href, label, Icon }) => (
					<Button
						key={href}
						href={href}
						variant="text"
						className={slyles['nav-menu__link']}
					>
						<Icon size={25} className={slyles['nav-menu__link-icon']} />
						<p className={slyles['nav-menu__link-text']}>{label}</p>
					</Button>
				))}
			</div>
		</div>
	);
};

export default NavMenu;
