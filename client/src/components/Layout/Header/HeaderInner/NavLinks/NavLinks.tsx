'use client';

import { List } from '@/components/UI';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LINKS } from './links';
import styles from './NavLinks.module.scss';

interface NavLinksProps {
	closeMenu?: () => void;
}

const NavLinks = ({ closeMenu = () => {} }: NavLinksProps) => {
	const { user } = useAuth();
	const pathname = usePathname();

	if (!user && LINKS.some((link) => link.isAuth)) {
		return null;
	}

	return (
		<List
			items={LINKS}
			className={styles['nav-list']}
			listComponent="ul"
			gap={20}
			renderItem={(link) => {
				if (user?.role !== 'ADMIN' && link.isAdmin) return null;

				return (
					<li key={link.name} className={styles['nav-item']}>
						<Link
							href={link.path}
							className={`${styles['nav-link']} ${
								pathname.startsWith(link.path) ? styles.active : ''
							}`}
							onClick={closeMenu}
						>
							{link.label}
						</Link>
					</li>
				);
			}}
		/>
	);
};

export default NavLinks;
