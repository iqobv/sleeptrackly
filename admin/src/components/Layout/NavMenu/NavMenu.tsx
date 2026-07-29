'use client';

import { useNavMenuStore } from '@/store/navMenu.store';
import { useMounted } from '@shared/hooks';
import clsx from 'clsx';
import slyles from './NavMenu.module.scss';
import { NavMenuLink } from './NavMenuLink/NavMenuLink';
import { NAV_MENU_LINKS } from './navMenuLinks';

export const NavMenu = () => {
	const mounted = useMounted();

	const isExpended = useNavMenuStore((state) => state.isExpanded);

	return (
		<div className={clsx(slyles.nav, isExpended && mounted ? slyles.open : '')}>
			<div className={slyles.links}>
				{NAV_MENU_LINKS.map((link) => (
					<NavMenuLink
						key={link.id}
						link={link}
						isOpen={isExpended && mounted}
					/>
				))}
			</div>
		</div>
	);
};
